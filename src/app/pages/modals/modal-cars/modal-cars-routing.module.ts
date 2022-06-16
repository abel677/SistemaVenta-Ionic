import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalCarsPage } from './modal-cars.page';

const routes: Routes = [
  {
    path: '',
    component: ModalCarsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalCarsPageRoutingModule {}
