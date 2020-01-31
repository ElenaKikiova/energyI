import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor( ) { }


  async getDateString(dateObj){
    let result;

    if(dateObj == null){
      dateObj = new Date();
    }
    
    let day = dateObj.getDate();
    if(day < 10) day = "0" + day;
    let month = dateObj.getMonth() + 1;
    if(month < 10) month = "0" + month;
    let year = dateObj.getFullYear();
    
    result = day + "." + month + "." + year;

    return result;

  }

}
