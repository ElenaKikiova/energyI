import { Component, OnInit } from '@angular/core';

import { LanguageService } from '../services/language.service';
import { MacronutrientsService } from '../services/macronutrients.service';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

  public lang = this.languageService.current;
  
  public products = {};

  constructor(
    private languageService: LanguageService,
    private productsService: ProductsService,
    private macronutrientsService: MacronutrientsService
  ) { }

  ngOnInit() {
    this.loadProducts();

    // for(let typeIndex in this.macronutrientsService.Types){
    //   let macronutrientLetter = this.macronutrientsService.Types[typeIndex].Letter;
    //   this.products[macronutrientLetter] = [];
    // }
  }
    
  async loadProducts(){

    this.productsService.getProducts().subscribe(async (data: any) => {

      console.log("***Products: ", data);

      this.products = data.defaultIngredients;

      // this.productsService.sortProductsByType(data.defaultIngredients, this.products);
      // this.productsService.sortProductsByType(data.userIngredients, this.products);

      // for(let i = 0; i < this.macronutrientsService.Types.length; i++){
      //   let type = this.macronutrientsService.Types[i].Letter;
      // }

      console.log("***Sorted: ", this.products);

    })

  }

}
