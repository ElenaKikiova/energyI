import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MacronutrientsService {

  public For1Block = {"P": 7, "C": 9, "F": 1.5}

  public Types = [
    { 
      "Name": "Протеини",
      "Letter": "P",
      "For1Block": this.For1Block.P
    },
    { 
      "Name": "Въглехидрати",
      "Letter": "C",
      "For1Block": this.For1Block.C
    },
    { 
      "Name": "Мазнини",
      "Letter": "F",
      "For1Block": this.For1Block.F
    }
  ]

  constructor() { }
}
