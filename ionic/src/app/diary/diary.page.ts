import { Component, OnInit } from '@angular/core';

import { LanguageService } from '../services/language.service';
import { DiaryService } from '../services/diary.service';
import { DateService } from '../services/date.service';

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

  public chartData: any[] = [];
  public colorScheme = { domain: [] }

  constructor(
    public languageService: LanguageService,
    public diaryService: DiaryService,
    public dateService: DateService
  ) {
  }

  ngOnInit(){
    
    monthNames = this.lang.monthNames;

    this.generateColorScheme();
    this.getDiaryData();
  }

  async getDiaryData(){

    this.diaryService.getDiaryData().subscribe(async (data: any) => {
      console.log(data);

      this.diaryData = data.diaryData;

      this.dateService.sortByDate(this.diaryData);

      this.chartData = await this.formatChartData();
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

    // 52 weeks before monday
    let chartData = [];
    let getDate = d => new Date(thisMondayYear, thisMondayMonth, d);
    let getDateString = d => d.getDate() + "." + d.getMonth() + "." + d.getFullYear();
    
    for (let week = 0; week >= -52; week--) {
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
          getDateString(new Date(record.Date)) == getDateString(date));
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

    return chartData;
  }

  async generateColorScheme(){
    let hue = 0;
    this.colorScheme.domain[0] = "#cccccc";
    for(let i = 1; i < 15; i++){
      this.colorScheme.domain.push("hsl(" + hue + ", 100%, 50%)");
      hue += 10;
    }
  }

  calendarAxisTickFormatting(mondayString: string) {
    let monday = new Date(mondayString);
    let month = monday.getMonth();
    let day = monday.getDate();
    let year = monday.getFullYear();
    let lastSunday = new Date(year, month, day - 1);
    let nextSunday = new Date(year, month, day + 6);
    return lastSunday.getMonth() !== nextSunday.getMonth() ? monthNames[month] + " " + year : '';
  }

  calendarTooltipText(c): string {
    return `
      <span class="tooltip-label">${c.label} • ${c.cell.date.toLocaleDateString()}</span>
      <span class="tooltip-val">${c.data.toLocaleString()}</span>
    `;
  }

}
