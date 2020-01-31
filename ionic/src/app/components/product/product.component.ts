import { Component, OnInit, Input } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';

import { LanguageService } from '../../services/language.service';

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
          console.log('Favorite clicked');
        }
      },
      {
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          console.log('Delete clicked');
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
