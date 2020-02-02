import { Component, OnInit } from '@angular/core';

import { LanguageService } from '../services/language.service';
import { DiaryService } from '../services/diary.service';
import { DateService } from '../services/date.service';


const monthName = new Intl.DateTimeFormat("en-us", { month: "short" });
const weekdayName = new Intl.DateTimeFormat("en-us", { weekday: "short" });

@Component({
  selector: 'app-diary',
  templateUrl: './diary.page.html',
  styleUrls: ['./diary.page.scss'],
})
export class DiaryPage implements OnInit {

  public lang = this.languageService.current;

  public name = 'Angular';
  public showXAxis = true;
  public showYAxis = true;
  public gradient = false;
  public showLegend = true;
  public legendTitle = 'Legend';
  public legendPosition = 'right';
  public showXAxisLabel = true;
  public tooltipDisabled = false;
  public showText = true;
  public xAxisLabel = 'Country';
  public showYAxisLabel = true;
  public yAxisLabel = 'GDP Per Capita';
  public showGridLines = true;
  public innerPadding = '10%';
  public barPadding = 8;
  public groupPadding = 16;
  public roundDomains = false;
  public maxRadius = 10;
  public minRadius = 3;
  public showSeriesOnHover = true;
  public roundEdges: boolean = true;
  public animations: boolean = true;
  public xScaleMin: any;
  public xScaleMax: any;
  public yScaleMin: number;
  public yScaleMax: number;
  public showDataLabel = false;
  public noBarWhenZero = true;
  public trimXAxisTicks = true;
  public trimYAxisTicks = true;
  public rotateXAxisTicks = true;
  public maxXAxisTickLength = 16;
  public maxYAxisTickLength = 16;
  public colorScheme = "vivid";
  public schemeType: string = 'ordinal';
  public selectedColorScheme: string;

  // heatmap
  heatmapMin: number = 0;
  heatmapMax: number = 12;
  calendarData: any[] = [];

  constructor(
    public languageService: LanguageService,
    public diaryService: DiaryService,
    public dateService: DateService
  ) {
    this.calendarData = this.getCalendarData();
  }

  ngOnInit(){

  }

  calendarAxisTickFormatting(mondayString: string) {
    const monday = new Date(mondayString);
    const month = monday.getMonth();
    const day = monday.getDate();
    const year = monday.getFullYear();
    const lastSunday = new Date(year, month, day - 1);
    const nextSunday = new Date(year, month, day + 6);
    return lastSunday.getMonth() !== nextSunday.getMonth() ? monthName.format(nextSunday) : '';
  }

  calendarTooltipText(c): string {
    return `
      <span class="tooltip-label">${c.label} • ${c.cell.date.toLocaleDateString()}</span>
      <span class="tooltip-val">${c.data.toLocaleString()}</span>
    `;
  }

  getCalendarData(): any[] {
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
    const calendarData = [];
    const getDate = d => new Date(thisMondayYear, thisMondayMonth, d);
    for (let week = -52; week <= 0; week++) {
      const mondayDay = thisMondayDay + week * 7;
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
        const value = dayOfWeek < 6 ? date.getMonth() + 1 : 0;
        
        series.push({
          date,
          name: weekdayName.format(date),
          value
        });
      }

      calendarData.push({
        name: monday.toString(),
        series
      });
    }

    return calendarData;
  }

}
