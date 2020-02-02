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

  async getTime(dateObj){
    let result;

    if(dateObj == null){
      dateObj = new Date();
    }
    
    let hours = dateObj.getHours();
    if(hours < 10) hours = "0" + hours;
    let minutes = dateObj.getMinutes();
    if(minutes < 10) minutes = "0" + minutes;
    
    result = hours + ":" + minutes;

    return result;

  }

  async sortByDate(array){
    array.sort(function(a, b){
      let aValue = new Date(a.Date).getTime();
      let bValue = new Date(b.Date).getTime();
      return bValue - aValue;
    })
  }


}
