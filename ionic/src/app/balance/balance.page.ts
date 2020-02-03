import { Component, OnInit } from '@angular/core';

import { LanguageService } from '../services/language.service';
import { MacronutrientsService } from '../services/macronutrients.service';
import { ProductsService } from '../services/products.service';
import { MealService } from '../services/meal.service';
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
  public disabledSelectProducts = {};

  public editingProductIndex = 0;

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
    private macronutrientsService: MacronutrientsService,
    private productsService: ProductsService,
    private mealService: MealService,
    private languageService: LanguageService,
    private dateService: DateService
  ) { }

  ngOnInit() {

    this.loadProducts();

    for(let typeIndex in this.macronutrientsService.Types){
      let macronutrientLetter = this.macronutrientsService.Types[typeIndex].Letter;
      this.products[macronutrientLetter] = [];
      this.selectProducts[macronutrientLetter] = [];
      this.disabledSelectProducts[macronutrientLetter] = [];
      this.addedProducts[macronutrientLetter] = [];
      this.addedProductsIndexes[macronutrientLetter] = [];
      this.blocks[macronutrientLetter] = 0;
      this.blocksLeft[macronutrientLetter] = this.blocks.target;
    }
  }

  async loadProducts(){

    this.productsService.getProducts().subscribe(async (data: any) => {

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
    this.editingProductIndex = null;
  }

  async calculateFor1Block(type, value){
    return this.macronutrientsService.For1Block[type] / value * 100;

  }

  async setCurrentProduct($event){
    let productToAddIndex = this.current.chosenProduct.id;
    let currentProduct = this.getProductByIndex(this.current.productType, productToAddIndex);

    this.current.productFor1Block = await this.calculateFor1Block(currentProduct.Type, currentProduct.Value)
    console.log(this.current)
    this.current.blocks = 1;
    this.calculateWeight();

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
      "weight": this.current.weight,
      "blocks": this.current.blocks
    });

    this.addedProductsIndexes[productObj.Type].push(this.current.chosenProduct.id);

    this.disabledSelectProducts[productObj.Type].push({
      id: this.current.chosenProduct.id,
      name: productObj.Name
    })

    console.log(this.disabledSelectProducts);

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
      "Time": await this.dateService.getTime(null),
      "Blocks": this.blocks.target
    }

    console.log(mealData)

    this.mealService.addToDiary(mealData).subscribe(async (data: any) => {
      error => {
        console.log("err");
      }
    });
  }

  async editProduct(type, index){

    let productObj = this.addedProducts[type][index];
    let indexInProducts = this.addedProductsIndexes[type][index];

    // Set up calculator
    this.setUpCalculator(type);
    this.current.chosenProduct = { id: indexInProducts, name: productObj.info.Name };
    this.current.productFor1Block = await this.calculateFor1Block(productObj.info.Type, productObj.info.Value)
    this.current.weight = productObj.weight;
    this.current.blocks = productObj.blocks;
    this.editingProductIndex = index;
  }

  async saveChangesToProduct(index){

    this.deleteProduct(this.current.productType, this.editingProductIndex);

    this.addProduct();
  
  }

  async deleteProduct(type, index){

    let productObj = this.addedProducts[type][index];
    let indexInSelectProducts = this.addedProductsIndexes[type][index];
    this.addedProducts[type].splice(index, 1);
    this.addedProductsIndexes[type].splice(index, 1);

    let selectObj = this.selectProducts[type][indexInSelectProducts];

    for(let i = 0; i < this.disabledSelectProducts[type].length; i++){
      let current = this.disabledSelectProducts[type][i];
      if(current.name == selectObj.name) {
        this.disabledSelectProducts[type].splice(i, 1);
        break;
      }
    }

    this.blocks[type] -= productObj.blocks;
  }


}
