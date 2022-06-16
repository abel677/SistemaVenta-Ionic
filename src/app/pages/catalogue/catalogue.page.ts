import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { InCategories } from 'src/app/interfaces/in-categories';
import { InProducts } from 'src/app/interfaces/in-products';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';


@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.page.html',
  styleUrls: ['./catalogue.page.scss'],
})
export class CataloguePage implements OnInit {

  urlImage= "../../../assets/img/telefono.jpg";
  categories:InCategories[];
  products:InProducts[];

  constructor(
    private cs:CategoriesService,
    private ps:ProductsService,
    private route:Router

  )
  {

  }

  ngOnInit() {
    this.getCategories();
  }
  getCategories(){
    this.cs.getCategory().subscribe({
      next:(res:InCategories[])=>this.categories = res,
      error:(err)=>console.log(err)
    });
  }
  getProducts(id:number){
    this.route.navigate([`/products/${id}`]);
  }




  /* async openModal(form:InProducts[]){
    const modal =  await this.modalCtrl.create({
      component: ProductsPage,
      componentProps:{
        _products:form
      },
      cssClass: '',
    });
    await modal.present();
    const {data} = await modal.onDidDismiss();
    console.log('Retorno del modal',data);
  } */

}
