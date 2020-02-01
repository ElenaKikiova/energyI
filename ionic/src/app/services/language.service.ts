import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  public lang = "BG";
  public current;

  public BG = {
    "diaryPage": "Дневник",
    "isBalanced": "Балансирано!",
    "add": "Добавете",
    "reduceWith": "Намалете с ",
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
