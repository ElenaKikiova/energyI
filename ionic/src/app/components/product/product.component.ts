import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';

import { LanguageService } from '../../services/language.service';
import { EventEmitter } from 'events';

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {

  @Input() name: String;
  @Input() weight: Number;
  @Input() blocks: Number;
  @Input() imageName = 1;

  @Output() editProductEmitter = new EventEmitter();
  @Output() deleteProductEmitter = new EventEmitter();
  
  private imagePath;

  private lang = this.languageService.current;

  constructor(
    private languageService: LanguageService,
    private actionSheetController: ActionSheetController
  ) { }

  ngOnInit() {
    this.imagePath = "../assets/images/products/" + this.imageName + ".png";
    console.log(this);
  }

  async showProductOptions(){

    const actionSheet = await this.actionSheetController.create({
      header: 'Albums',
      buttons: [
      {
        text: 'Edit',
        icon: 'create',
        handler: () => {
          this.editProductEmitter.emit()
        }
      },
      {
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.deleteProductEmitter.emit()
        }
      }, 
      {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();

  }

}
