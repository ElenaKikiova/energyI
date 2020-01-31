import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

import { LanguageService } from '../services/language.service';
import { MacronutrientsService } from '../services/macronutrients.service';
import { ProductsService } from '../services/products.service';
import { DateService } from '../services/date.service';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.page.html',
  styleUrls: ['./balance.page.scss'],
})
export class BalancePage implements OnInit {

  public lang = this.languageService.current;

  public products = {};
  public addedProducts = {};
  public addedProductsIndexes = {};

  public selectProducts = {};

  public current = {
    productType: "",
    chosenProduct: null,
    productFor1Block: null,
    weight: 0,
    blocks: 1
  }

  public blocks = {
    target: 3
  }

  public blocksLeft = {}

  constructor(
    private alertController: AlertController,
    private macronutrientsService: MacronutrientsService,
    private productsService: ProductsService,
    private languageService: LanguageService,
    private dateService: DateService
  ) { }

  ngOnInit() {

    this.loadProducts();

    for(let typeIndex in this.macronutrientsService.Types){
      let macronutrientLetter = this.macronutrientsService.Types[typeIndex].Letter;
      this.products[macronutrientLetter] = [];
      this.selectProducts[macronutrientLetter] = [];
      this.addedProducts[macronutrientLetter] = [];
      this.addedProductsIndexes[macronutrientLetter] = [];
      this.blocks[macronutrientLetter] = 0;
      this.blocksLeft[macronutrientLetter] = this.blocks.target;
    }
  }

  async loadProducts(){

    this.productsService.getProducts().subscribe(async (data) => {

      console.log("***Products: ", data);

      this.productsService.sortProductsByType(data.defaultIngredients, this.products);
      this.productsService.sortProductsByType(data.userIngredients, this.products);

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
    this.current.chosenProduct = null;
    this.current.productFor1Block = 0;
    this.current.blocks = 0;
    this.current.weight = 0;
  }

  async setCurrentProduct($event){
    let productToAddIndex = this.current.chosenProduct.id;
    let currentProduct = this.getProductByIndex(this.current.productType, productToAddIndex);

    if(this.addedProductsIndexes[currentProduct.Type].indexOf(productToAddIndex) < 0){

      this.current.productFor1Block = 
        this.macronutrientsService.For1Block[this.current.productType] / 
        currentProduct.Value * 100;

      this.current.blocks = 1;
      this.calculateWeight();

    }
    else{

      this.current.chosenProduct = null;

      const alert = await this.alertController.create({
        header: this.lang.productAlreadyAddedError,
        subHeader: this.lang.productAlreadyAddedErrorMessage,
        buttons: ['OK']
      });
  
      await alert.present();

    }
  }

  calculateWeight(){
    if(this.current.chosenProduct != null){
      this.current.weight = Math.round(this.current.blocks * this.current.productFor1Block * 10) / 10;
    }
  }

  calculateBlocks(){
    if(this.current.chosenProduct != null){
      this.current.blocks  = Math.round(this.current.weight / this.current.productFor1Block * 10) / 10;
    }
  }

  async addProduct(){

    let productObj = this.getProductByIndex(this.current.productType, this.current.chosenProduct.id);

    this.addedProducts[productObj.Type].push({
      "info": productObj,
      "weight": this.current.weight
    });

    this.addedProductsIndexes[productObj.Type].push(this.current.chosenProduct.id);

    this.blocks[productObj.Type] += this.current.blocks;

    this.setUpCalculator(null);

  }

  isAllBalanced(){
    let result = false;
    let balanced = 0;
    for(let i = 0; i < Object.keys(this.blocksLeft).length; i++){
      if(this.blocksLeft[this.macronutrientsService.Types[i].Letter] == 0) balanced += 1;
    }

    if(balanced == this.macronutrientsService.Types.length){
      result = true;
    }

    return result;
  }

  async addMealToDiary(){
    console.log("***Adding to diary");

    let mealData = {
      "Date": this.dateService.getDateString(null)
    }

    console.log(mealData)

    // this.mealService.addToDiary(mealData);
  }

}
