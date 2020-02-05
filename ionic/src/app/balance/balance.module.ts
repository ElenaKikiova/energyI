import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ComponentsModule } from '../components/components.module';

import { IonicSelectableModule } from 'ionic-selectable';

import { BalancePage } from './balance.page';


const routes: Routes = [
  {
    path: '',
    component: BalancePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    IonicSelectableModule,
    RouterModule.forChild(routes)
  ],
  declarations: [BalancePage]
})
export class BalancePageModule {}
