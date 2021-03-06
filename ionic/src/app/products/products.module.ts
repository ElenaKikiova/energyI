import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { IonicModule } from '@ionic/angular';

import { ProductsPage } from './products.page';


const routes: Routes = [
  {
    path: '',
    component: ProductsPage
  }
];

@NgModule({
  declarations: [ProductsPage ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgxDatatableModule,
    RouterModule.forChild(routes)
  ]
})
export class ProductsPageModule {}
