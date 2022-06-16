import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonList, ModalController, ToastController } from '@ionic/angular';
import { InCategories } from 'src/app/interfaces/in-categories';
import { InProducts } from 'src/app/interfaces/in-products';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';
import { ModalEditPage } from './modal-edit/modal-edit.page';



@Component({
  selector: 'app-register-product',
  templateUrl: './register-product.page.html',
  styleUrls: ['./register-product.page.scss'],
})
export class RegisterProductPage implements OnInit {

  form:FormGroup;
  categories:InCategories[];
  products:InProducts[];
  message:string;

  @ViewChild('list') list:IonList;

  constructor(
    private cs:CategoriesService,private ps:ProductsService, 
    private fb:FormBuilder, public modalCtrl:ModalController,
    private toastController:ToastController
  )
  {
    this.form = this.fb.group({
      description:['',Validators.required],
      price:['',Validators.required],
      id_categories:['',Validators.required]

    });
  }

  ngOnInit() {
    this.getCategories();
    this.getProducts();
  }
 
  async openModal(products:InProducts){
    const modal =  await this.modalCtrl.create({
      component: ModalEditPage,
      componentProps:{
       _id:products.id,
       _description:products.description,
       _price:products.price,
       _id_categories:products.id_categories
      },
      cssClass: 'my-custom-modal-css',
    });
    await modal.present();
    const {data} = await modal.onDidDismiss();
    console.log('Retorno del modal',data);
    this.getProducts();
    this.list.closeSlidingItems();
    
  }
  
  getCategories(){
    this.cs.getCategory().subscribe({
      next:(res:InCategories[])=>this.categories = res,
      error:(err)=>console.log(err)
            
    });
  }
  postProducts(){
    if(this.form.valid){
      this.ps.postProducts(this.form.value).subscribe({
        next:(res)=>{console.log(res);
      },
        error:(err)=>console.log(err)
      });
      this.form.controls['description'].setValue(' ');
      this.form.controls['price'].setValue(' ');
      this.form.controls['id_categories'].setValue(' ');
      this.getProducts();
    }else{
      console.log("campos invalidos");
      
    }
  }
  getProducts(){
    this.ps.getProducts().subscribe({
      next:(res:InProducts[])=>this.products = res,
      error:(err)=> console.log(err)
      
    });
  }
  showProducts(id:number){
    this.ps.showProduts(id).subscribe({
      next:(res:InProducts)=>this.openModal(res),
      error:(err)=>console.log(err)
      
    });
    
  }
  deleteProducts(id:number){
    this.ps.deleteProducts(id).subscribe({
      next:(res)=> {this.message = res['message'];
      this.presentToast();
      this.getProducts();
    },
      error:(err)=>console.log(err)
    });
    
    this.list.closeSlidingItems();
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: this.message,
      duration: 2000
    });
    toast.present();
  }

}
