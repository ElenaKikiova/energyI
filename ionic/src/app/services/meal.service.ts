import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ConnectToServerService } from './connectToServer.service';

@Injectable({
  providedIn: 'root'
})
export class MealService {

  constructor( 
    public http: HttpClient,
    public connectToServerService: ConnectToServerService,
  ) { }

  public addToDiary(mealData){
    console.log(mealData)
    return this.http.post(this.connectToServerService.serverUrl + '/addMealToDiary',
    { data: mealData })
  }

  public deleteFromDiary(data){
    return this.http.post(this.connectToServerService.serverUrl + '/deleteFromDiary', 
    { data: data })
  }

}
