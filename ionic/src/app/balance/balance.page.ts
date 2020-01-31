import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

import { MacronutrientsService } from '../services/macronutrients.service';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.page.html',
  styleUrls: ['./balance.page.scss'],
})
export class BalancePage implements OnInit {

  public products = {};
  public addedProducts = {};
  public addedProductsIndexes = {};

  public selectProducts = {};

  public current = {
    productType: "",
    productIndex: null,
    productFor1Block: null,
    weight: 0,
    blocks: 1
  }

  public blocks = {
    target: 3
  }

  constructor(
    private alertController: AlertController,
    private macronutrientsService: MacronutrientsService,
    private productsService: ProductsService
  ) { }

  ngOnInit() {
    console.log(this.macronutrientsService)

    this.loadProducts();

    for(let typeIndex in this.macronutrientsService.Types){
      let macronutrientLetter = this.macronutrientsService.Types[typeIndex].Letter;
      this.products[macronutrientLetter] = [];
      this.selectProducts[macronutrientLetter] = [];
      this.addedProducts[macronutrientLetter] = [];
      this.addedProductsIndexes[macronutrientLetter] = [];
      this.blocks[macronutrientLetter] = 0;
    }
  }

  async loadProducts(){

    this.productsService.getProducts().subscribe(async (data) => {

      console.log("***Products: ", data);

      let unsortedDefault = data.defaultIngredients;
      let unsortedUser = data.userIngredients;

      this.productsService.sortProductsByType(unsortedDefault, this.products);
      this.productsService.sortProductsByType(unsortedUser, this.products);

      for(let i = 0; i < this.macronutrientsService.Types.length; i++){
        let type = this.macronutrientsService.Types[i].Letter;
        for(let k = 0; k < this.products[type].length; k++){
          this.selectProducts[type].push({
            id: k,
            name: this.products[type][k].Name
          })
        }
      }

      console.log("***Sorted: ", this.products);
      console.log("***Products for selectable: ", this.selectProducts)

    })

  }


  getProductByIndex(type, index){
    return this.products[type][index];
  }

  async setUpCalculator(macronutrient){
    this.current.productType = macronutrient;
    this.current.productIndex = null;
    this.current.productFor1Block = 0;
    this.current.blocks = 0;
    this.current.weight = 0;
  }

  async setCurrentProduct($event){
    let productToAddIndex = this.current.productIndex.id;
    let currentProduct = this.getProductByIndex(this.current.productType, productToAddIndex);
    console.log(currentProduct)

    if(this.addedProductsIndexes[currentProduct.Type].indexOf(productToAddIndex) < 0){

      // this.current.productIndex = $event.target.value;
      this.current.productFor1Block = 
        this.macronutrientsService.For1Block[this.current.productType] / 
        currentProduct.Value * 100;

      this.current.blocks = 1;
      this.calculateWeight();
      // this.current.weight = this.current.productFor1Block;

      console.log(this.current)

    }
    else{

      this.current.productIndex = null;

      const alert = await this.alertController.create({
        header: 'Този продукт вече е добавен',
        subHeader: 'Може да редактирате количеството му',
        buttons: ['OK']
      });
  
      await alert.present();

    }
  }

  calculateWeight(){
    console.log("calcW")
    if(this.current.productIndex != null){
      this.current.weight = Math.round(this.current.blocks * this.current.productFor1Block * 10) / 10;
    }
  }

  calculateBlocks(){
    console.log("calcB")
    if(this.current.productIndex != null){
      this.current.blocks  = Math.round(this.current.weight / this.current.productFor1Block * 10) / 10;
      console.log(this.current.weight / this.current.productFor1Block)
    }
  }

  async addProduct(){

    let productObj = this.getProductByIndex(this.current.productType, this.current.productIndex);

    this.addedProducts[productObj.Type].push({
      "info": productObj,
      "weight": this.current.weight
    });
    this.addedProductsIndexes[productObj.Type].push(this.current.productIndex);

    this.setUpCalculator(null);

    console.log(this.addedProducts)
  }

}
