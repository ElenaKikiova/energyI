import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MacronutrientsService {

  public For1Block = {"P": 7, "C": 9, "F": 1.5}

  public Types = [
    { 
      "Letter": "P",
      "For1Block": this.For1Block.P
    },
    { 
      "Letter": "C",
      "For1Block": this.For1Block.C
    },
    { 
      "Letter": "F",
      "For1Block": this.For1Block.F
    }
  ]

  public Colors = {
    "P": "primary",
    "C": "secondary",
    "F": "tertiary"
  }

  public showingOrderInProductsPage = {
    "C": 0,
    "P": 1,
    "F": 2
  }

  constructor() { }
}
