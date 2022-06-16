import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { InCategories } from 'src/app/interfaces/in-categories';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-modal-edit',
  templateUrl: './modal-edit.page.html',
  styleUrls: ['./modal-edit.page.scss'],
})
export class ModalEditPage implements OnInit {

  @Input() _id:number;
  @Input() _description:string;
  @Input() _price:number;
  @Input() _id_categories:number;
  
  categories:InCategories[];
  message:string;
  form:FormGroup;

  constructor(
    public modalCtrl:ModalController, private fb:FormBuilder,
    private ps:ProductsService, private cs:CategoriesService,
    public toastController:ToastController
    )
  {
    this.form = this.fb.group({
      id:[''],
      description:['', Validators.required],
      price:['', Validators.required],
      id_categories:['', Validators.required]
    });  
  }

  ngOnInit() {
    this.showCategories();
    this.getProducts();
   
  }
  showCategories(){
    this.cs.getCategory().subscribe({
      next:(res:InCategories[])=> this.categories = res ,
      error:(err)=>console.log(err)  
    });
  }
  getProducts(){
    this.form.controls['id'].setValue(this._id);
    this.form.controls['description'].setValue(this._description);
    this.form.controls['price'].setValue(this._price);
    this.form.controls['id_categories'].setValue(this._id_categories);
  }
  

  closeModal(){
    this.modalCtrl.dismiss();
  }
  editProducts(){
    if(this.form.valid){
      this.ps.updateProducts(this._id,this.form.value).subscribe({
        next:(res)=>{this.message = res['message'];
        this.presentToast();
      },
        error:(err)=>console.log(err)
        
      });
      this.modalCtrl.dismiss({
        _id:this.form.controls['id'].value,
        _description:this.form.controls['description'].value,
        _price:this.form.controls['price'].value,
        _id_categories:this.form.controls['id_categories'].value
      });
    }else{
      this.message = "campos invalidos";
      this.presentToast();
    }
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: this.message,
      duration: 2000
    });
    toast.present();
  }

}
