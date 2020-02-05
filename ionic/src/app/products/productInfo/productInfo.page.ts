import { Component, OnInit, Input, Injectable } from '@angular/core';
import { ModalController, NavParams, ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'modal-page',
  templateUrl: './productInfo.page.html'
})

@Injectable()
export class ProductInfoPage implements OnInit {

  constructor(
    private modalController: ModalController,
    private navParams: NavParams
  ) { }

  ngOnInit() {
    

  }

  async closeModal(){
    await this.modalController.dismiss();
  }

}
