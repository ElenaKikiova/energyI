import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DiaryPage } from './diary.page';
import { NgxChartsModule } from '@swimlane/ngx-charts';


const routes: Routes = [
  {
    path: '',
    component: DiaryPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormsModule,
    NgxChartsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DiaryPage]
})
export class DiaryPageModule {}
