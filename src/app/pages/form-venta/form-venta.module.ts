import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormVentaPageRoutingModule } from './form-venta-routing.module';

import { FormVentaPage } from './form-venta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormVentaPageRoutingModule
  ],
  declarations: [FormVentaPage]
})
export class FormVentaPageModule {}
