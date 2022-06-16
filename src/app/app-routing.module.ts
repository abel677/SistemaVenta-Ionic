import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'folder/Inbox',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'categories',
    loadChildren: () => import('./pages/categories/categories.module').then( m => m.CategoriesPageModule)
  },
  {
    path: 'register-product',
    loadChildren: () => import('./pages/register-product/register-product.module').then( m => m.RegisterProductPageModule)
  },
  {
    path: 'catalogue',
    loadChildren: () => import('./pages/catalogue/catalogue.module').then( m => m.CataloguePageModule)
  },
  {
    path: 'products/:id',
    loadChildren: () => import('./pages/products/products.module').then( m => m.ProductsPageModule)
  },
  {
    path: 'modal-cars',
    loadChildren: () => import('./pages/modals/modal-cars/modal-cars.module').then( m => m.ModalCarsPageModule)
  },
  {
    path: 'form-venta',
    loadChildren: () => import('./pages/form-venta/form-venta.module').then( m => m.FormVentaPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
