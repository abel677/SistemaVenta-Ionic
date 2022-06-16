import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonList, ModalController } from '@ionic/angular';
import { InProducts } from 'src/app/interfaces/in-products';
import { CarService } from 'src/app/services/car.service';
import { ProductsService } from 'src/app/services/products.service';
import { ModalCarsPage } from '../modals/modal-cars/modal-cars.page';


@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

/*   @Input() _products:InProducts[]; */

  @ViewChild('list') list:IonList;

  products:InProducts[];

 
  constructor
  (
    private route:ActivatedRoute, private ps:ProductsService,
    private cs:CarService, private modalCtrl:ModalController,
    private rote:Router
  ){}
  ngOnInit() {
    this.route.params.subscribe(id =>{
      this.getProducts(id['id']);
    });
  }
  addCart(id:number){
   this.products.forEach(p => {
    if(p.id == id){
      this.openModal(p)      
    }
   });
    
  }
  getProducts(id:number){

    this.ps.editProducts(id).subscribe({
      next:(res:InProducts[])=>this.products = res,
      error:(err)=>console.log(err)
            
    });
  }
 
  async openModal(product:InProducts){
    const modal =  await this.modalCtrl.create({
      component: ModalCarsPage,
      componentProps:{
       _products:product,
              
      },
      cssClass: 'modalCars',
    });
    await modal.present();
    const {data} = await modal.onDidDismiss();
    console.log('Retorno del modal',data);

  }
  back(){
    this.rote.navigate(['/catalogue']);
  }


}

