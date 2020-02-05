import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

import { LanguageService } from '../services/language.service';
import { DiaryService } from '../services/diary.service';
import { DateService } from '../services/date.service';
import { MealService } from '../services/meal.service';

let monthNames = [];

let monthName = new Intl.DateTimeFormat("en-us", { month: "short" });
let weekdayName = new Intl.DateTimeFormat("en-us", { weekday: "short" });

@Component({
  selector: 'app-diary',
  templateUrl: './diary.page.html',
  styleUrls: ['./diary.page.scss'],
})
export class DiaryPage implements OnInit {

  public lang = this.languageService.current;

  public diaryData = [];

  public todayData = { Details: [] };
  public todayDateString = this.dateService.getDateForComparison(new Date());

  public chartData: any[] = [];
  public colorScheme = { domain: [] }

  constructor(
    private languageService: LanguageService,
    private diaryService: DiaryService,
    private dateService: DateService,
    private alertController: AlertController,
    private mealService: MealService
  ) { 
    
  }

  ngOnInit(){
    
    monthNames = this.lang.monthNames;

    this.generateColorScheme();
    this.getDiaryData();
  }

  async addBlocksManually(){

    const alert = await this.alertController.create({
      header: this.lang.addBlocksManually,
      inputs: [
        {
          name: 'blocks',
          type: 'number',
          placeholder: '3'
        }
      ],
      buttons: [
        {
          text: this.lang.cancel,
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: this.lang.add,
          handler: async (input) => {
            let blocksToAdd = parseFloat(input.blocks);
            if(blocksToAdd > 0){
              this.mealService.addToDiary({
                "Time": await this.dateService.getTime(null),
                "Blocks": blocksToAdd
              }).subscribe(async (data: any) => {
                  this.diaryData[0].Blocks += blocksToAdd;
                  this.todayData.Details.push({
                    "time": await this.dateService.getTime(null),
                    "blocks": blocksToAdd
                  });
                  this.formatChartData();
                },
                error => {
                  console.log("err");
                }
              );
            }
          }
        }
      ]
    });

    await alert.present();

  }

  async deleteRecord(i){

    let record = this.todayData.Details[i];
    console.log(record, i)

    let newBlocks = this.diaryData[0].Blocks - parseFloat(record.blocks);

    this.mealService.deleteFromDiary({
      mealIndex: i,
      newBlocks: newBlocks
    }).subscribe(async (data: any) => {
      this.diaryData[0].Blocks -= parseFloat(record.blocks);
      this.todayData.Details.splice(i, 1);
      this.formatChartData();
    },
    error => {
      console.log("err");
    }
  );

  }

  async getDiaryData(){

    this.diaryService.getDiaryData().subscribe(async (data: any) => {
      console.log(data);

      this.diaryData = data.diaryData;

      this.todayData = this.diaryData.filter((record) => 
        this.dateService.getDateForComparison(new Date(record.Date)) == this.todayDateString)[0];

      this.dateService.sortByDate(this.diaryData);

      this.formatChartData();
    })
    
  }

  async formatChartData() {
    // Newest diary record  
    let start = new Date(this.diaryData[0].Date);
    let startDay = start.getDate();
    let startDate = new Date(start.getFullYear(), start.getMonth(), startDay);

    console.log(start, startDay, startDate);

    // Monday
    let thisMonday = new Date(startDate.getFullYear(), startDate.getMonth(), startDay - startDate.getDay() + 1);
    let thisMondayDay = thisMonday.getDate();
    let thisMondayYear = thisMonday.getFullYear();
    let thisMondayMonth = thisMonday.getMonth();

    // 26 weeks (half a year) before monday
    let chartData = [];
    let getDate = d => new Date(thisMondayYear, thisMondayMonth, d);
    
    for (let week = 0; week >= -26; week--) {
      let mondayDay = thisMondayDay + week * 7;
      let monday = getDate(mondayDay);

      // one week
      let series = [];
      for (let dayOfWeek = 7; dayOfWeek > 0; dayOfWeek--) {
        let date = getDate(mondayDay - 1 + dayOfWeek);

        // value
        // let value = dayOfWeek < 6 ? date.getMonth() + 1 : 0;
        let value = 0;
        let findValue = this.diaryData.filter((record) => 
          this.dateService.getDateForComparison(new Date(record.Date)) == this.dateService.getDateForComparison(date));
        if(findValue.length > 0){
          value = findValue[0].Blocks;
        }
        
        series.push({
          date,
          name: this.lang.weekdayName[dayOfWeek - 1],
          value
        });
      }

      chartData.push({
        name: monday.toString(),
        series
      });
    }

    this.chartData = chartData;
  }

  async generateColorScheme(){
    let hue = 0;
    this.colorScheme.domain[0] = "#dddddd";
    for(let i = 1; i < 15; i++){
      this.colorScheme.domain.push("hsl(" + hue + ", 100%, 50%)");
      hue += 10;
    }
  }

  calendarAxisTickFormatting(mondayString) {
    let monday = new Date(mondayString);
    let month = monday.getMonth();
    let day = monday.getDate();
    let year = monday.getFullYear();
    let lastSunday = new Date(year, month, day - 1);
    let nextSunday = new Date(year, month, day + 6);
    return day > 12 && day < 20 ? monthNames[month]  : '';
  }

  calendarTooltipText(c) {
    return `
      <span class="tooltip-label">${c.cell.date.toLocaleDateString()}</span>
      <span class="tooltip-val">${c.data} </span>
    `;
  }

}
