import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComponentsModule } from '../components/components.module';

import { BalancePageRoutingModule } from './balance-routing.module';

import { IonicSelectableModule } from 'ionic-selectable';

import { BalancePage } from './balance.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    BalancePageRoutingModule,
    IonicSelectableModule
  ],
  declarations: [BalancePage]
})
export class BalancePageModule {}
