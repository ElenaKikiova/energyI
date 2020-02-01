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

  public gg = [
    {
      "name": "Germany",
      "series": [
        {
          "name": "1990",
          "value": 62000000
        }
      ]
    },
  
    {
      "name": "USA",
      "series": [
        {
          "name": "1990",
          "value": 250000000
        }
      ]
    },
  
    {
      "name": "France",
      "series": [
        {
          "name": "1990",
          "value": 58000000
        }
      ]
    },
    {
      "name": "UK",
      "series": [
        {
          "name": "1990",
          "value": 57000000
        }
      ]
    }
  ];

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

      for(let i = 0; i < this.diaryData.length; i++){
        let currentDiaryRecord = this.diaryData[i];
        this.heatMapData.push({
          "name": await this.dateService.getDateString(new Date(currentDiaryRecord.Date)),
          "series": [
            {
              "name": "blocks",
              "value": currentDiaryRecord.Blocks
            }
          ]
        })
      }

      
      console.log(this.heatMapData)
      console.log(this.gg)

    })

  }

}
