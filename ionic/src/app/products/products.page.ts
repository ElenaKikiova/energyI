import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

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

  public sorted = {
    "Type": -1,
    "Name": -1,
    "Value": -1
  }

  constructor(
    private languageService: LanguageService,
    private productsService: ProductsService,
    private macronutrientsService: MacronutrientsService,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.loadProducts();
  }

  async sortByCol(col){
    this.products = this.products.sort((a, b) => {
      let typeA = this.macronutrientsService.showingOrderInProductsPage[a.Type];
      let typeB = this.macronutrientsService.showingOrderInProductsPage[b.Type];
      let sorted;
      
      if(col == 'Type') {
        if(this.sorted.Type == 1) sorted = typeB - typeA;
        else sorted = typeA - typeB;
      }
      else if(col == 'Name') {
        if(this.sorted.Name == 1) sorted = b.Name.localeCompare(a.Name);
        else sorted = a.Name.localeCompare(b.Name);
      }
      else {
        if(this.sorted.Value == 1) sorted = b.Value - a.Value;
        else sorted = a.Value - b.Value;
      }
      return sorted;
    })

    this.sorted[col] *= -1;
  }
    
  async loadProducts(){

    this.productsService.getProducts().subscribe(async (data: any) => {


      this.products = data.defaultIngredients;
    
      this.sortByCol('Type');

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

  async showProductData(product){

    console.log(product);

    const alert = await this.alertController.create({
      header: this.lang.addBlocksManually,
      inputs: [
        {
          name: 'blocks',
          type: 'number',
          placeholder: '3'
        }
      ],
      buttons: [
        {
          text: this.lang.cancel,
          role: 'cancel',
          cssClass: 'secondary'
        }
      ]
    });

    await alert.present();

  }

}
