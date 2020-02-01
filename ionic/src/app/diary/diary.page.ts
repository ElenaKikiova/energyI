import { Component, OnInit } from '@angular/core';

import { LanguageService } from '../services/language.service';
import { DiaryService } from '../services/diary.service';
import { DateService } from '../services/date.service';

@Component({
  selector: 'app-diary',
  templateUrl: './diary.page.html',
  styleUrls: ['./diary.page.scss'],
})
export class DiaryPage implements OnInit {

  public lang = this.languageService.current;

  public colorScheme;

  public gg = [];

  public diaryData = [];

  public heatMapData = [];

  constructor(
    private diaryService: DiaryService,
    private languageService: LanguageService,
    private dateService: DateService
  ) { }

  ngOnInit() {
    this.colorScheme = {
      domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
    };

    this.getDiaryData();

  }

  async getDiaryData(){

    this.diaryService.getDiaryData().subscribe(async (data: any) => {
      console.log(data);

      this.diaryData = data.diaryData;
      this.formatData();

    })


  }

  async formatData(){
    
    this.heatMapData = [];

    

    // let series = [];

    // for(let i = 0; i < this.diaryData.length; i++){
    //   let currentDiaryRecord = this.diaryData[i];
    //   series.push(
    //     {
    //       "date": await this.dateService.getDateString(new Date(currentDiaryRecord.Date)),
    //       "name": "blocks",
    //       "value": currentDiaryRecord.Blocks
    //     }
    //   )
    // }

    // this.heatMapData.push({
    //   "name": "Feb",
    //   "series": series
    // })

    
    const monthName = new Intl.DateTimeFormat('en-us', { month: 'short' });
    const weekdayName = new Intl.DateTimeFormat('en-us', { weekday: 'short' });

    // today
    const now = new Date();
    const todaysDay = now.getDate();
    const thisDay = new Date(now.getFullYear(), now.getMonth(), todaysDay);

    // Monday
    const thisMonday = new Date(thisDay.getFullYear(), thisDay.getMonth(), todaysDay - thisDay.getDay() + 1);
    const thisMondayDay = thisMonday.getDate();
    const thisMondayYear = thisMonday.getFullYear();
    const thisMondayMonth = thisMonday.getMonth();

    // 52 weeks before monday
    const getDate = d => new Date(thisMondayYear, thisMondayMonth, d);

    for (let week = -52; week <= 0; week++) {
      const mondayDay = thisMondayDay + (week * 7);
      const monday = getDate(mondayDay);

      // one week
      const series = [];
      for (let dayOfWeek = 7; dayOfWeek > 0; dayOfWeek--) {
        const date = getDate(mondayDay - 1 + dayOfWeek);

        // skip future dates
        if (date > now) {
          continue;
        }

        // value
        const value = (dayOfWeek < 6) ? (date.getMonth() + 1) : 0;

        series.push({
          date,
          name: weekdayName.format(date),
          value
        });
      }

      this.heatMapData.push({
        name: monday.toString(),
        series
      });
    }

    console.log(this.heatMapData);
    console.log(this.gg);
  }

}
