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

  public columns = [
    { name: this.lang.product, prop: "Name" },
    { name: this.lang.type, prop: "Type" },
    { name: this.lang.value, prop: "Value" }
  ];

  public products = [];

  public rows = [];

  constructor(
    private languageService: LanguageService,
    private productsService: ProductsService,
    private macronutrientsService: MacronutrientsService
  ) { }

  ngOnInit() {
    this.loadProducts();
  }
    
  async loadProducts(){

    this.productsService.getProducts().subscribe(async (data: any) => {


      let rawData = data.defaultIngredients;
      
      this.products = rawData.sort((a, b) => {
        let sortByType = this.macronutrientsService.showingOrderInProductsPage[a.Type] - this.macronutrientsService.showingOrderInProductsPage[b.Type];
        let sortByName = a.Name.localeCompare(b.Name);
        return sortByType || sortByName
      })

      this.rows = this.products;

      console.log("***Products: ", data);
      
      console.log("***Rows: ", this.products);

    })

  }

  async updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // Filter products by name
    let filtered = this.products.filter((product) => {
      return product.Name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // Update rows
    this.rows = filtered;
  }

}
