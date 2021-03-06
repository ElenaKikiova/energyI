import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  public lang = "BG";
  public current;

  public BG = {
    "weekdayName": [
      "Пон",
      "Вт",
      "Ср",
      "Четв",
      "Пет",
      "Съб",
      "Нед"
    ],
    "monthNames": [
      "Яну",
      "Фев",
      "Март",
      "Апр",
      "Май",
      "Юни",
      "Юли",
      "Авг",
      "Септ",
      "Окт",
      "Ное",
      "Дек"
    ],
    "macronutrientLetters": {
      "P": "П",
      "C": "В",
      "F": "М"
    },
    "macronutrientNames": {
      "P": "Протеини",
      "C": "Въглехидрати",
      "F": "Мазнини"
    },
    "today": "Днес",
    "diaryPage": "Дневник",
    "blocksCalendar": "Календар на блоковете",
    "noMealsToday": "Няма записи за днес",
    "isBalanced": "Балансирано!",
    "reduceWith": "Намалете с ",
    "mealFor": "Ястие за",
    "balancePage": "Балансатор",
    "toBalancePage": "Към балансатор",
    "addBlocksManually": "Добави ръчно",
    "add": "Добави",
    "cancel": "Отказ",
    "balancedPlural": "Уравновесени",
    "blocks": "блока",
    "in": "в",
    "gramsAbbr": "гр.",
    "blocksAbbr": "бл.",
    "chooseProduct": "Изберете продукт",
    "productsPage": "Продукти",
    "product": "Продукт",
    "type": "Тип",
    "value": "Стойност за 100г.",
    "search": "Търсене",
    "menu": "Меню"
  }

  constructor() { 
    this.current = this[this.lang];
  }
}
