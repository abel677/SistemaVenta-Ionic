import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalCarsPageRoutingModule } from './modal-cars-routing.module';

import { ModalCarsPage } from './modal-cars.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalCarsPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ModalCarsPage]
})
export class ModalCarsPageModule {}
