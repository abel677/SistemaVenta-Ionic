import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-modal-edit',
  templateUrl: './modal-edit.page.html',
  styleUrls: ['./modal-edit.page.scss'],
})
export class ModalEditPage implements OnInit {

  @Input() _id:any;
  @Input() _category:any;

  form:FormGroup;
  message:string;

  constructor(
    public modalCtrl: ModalController, private fb:FormBuilder,
    private cs:CategoriesService, public toastController:ToastController,
    
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      id:[''],
      category:['',Validators.required]
    });
    this.getCategories();
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: this.message,
      duration: 2000
    });
    toast.present();
  }

  getCategories(){
    this.form.controls['id'].setValue(this._id);
    this.form.controls['category'].setValue(this._category);
  }
  closeModal(){
   this.modalCtrl.dismiss();
  }
  editCategories(){
    
    this.cs.updateCategory(this._id, this.form.value).subscribe({
      next:(res)=>{this.message = res['message'];
      this.presentToast();
    },
      error:(err)=>console.log(err)      
      
    });
    this.modalCtrl.dismiss();
    
  }

}
