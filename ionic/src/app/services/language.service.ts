import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  public lang = "BG";
  public current = {};

  public BG = {
    "productAlreadyAddedError": "Този продукт вече е добавен",
    "productAlreadyAddedErrorMessage": "Може да редактирате количеството му",
    "mealFor": "Ястие за",
    "balancePage": "Балансатор",
    "balancedPlural": "Уравновесени",
    "blocks": "блока",
    "gramsAbbr": "гр.",
    "blocksAbbr": "бл.",
    "chooseProduct": "Изберете продукт"
  }

  constructor() { 
    this.current = this[this.lang];
  }
}
