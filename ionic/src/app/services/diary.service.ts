import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ConnectToServerService } from './connectToServer.service';

@Injectable({
  providedIn: 'root'
})
export class DiaryService {

  constructor( 
    public http: HttpClient,
    public connectToServerService: ConnectToServerService,
  ) { }

  public getDiaryData(){
    return this.http.get(this.connectToServerService.serverUrl + '/getDiaryData')
  }

}
