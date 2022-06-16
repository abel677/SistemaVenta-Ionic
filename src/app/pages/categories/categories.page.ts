import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonList, ModalController, ToastController } from '@ionic/angular';
import { from } from 'rxjs';
import { InCategories } from 'src/app/interfaces/in-categories';
import { CategoriesService } from 'src/app/services/categories.service';
import { ModalEditPage } from './modal-edit/modal-edit.page';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {

  @ViewChild('list') list:IonList;

  constructor(
    private cs:CategoriesService, private fb:FormBuilder,
    public toastController: ToastController, public modalCtrl: ModalController
  ) { }
  categories:InCategories[] = [];
  form:FormGroup;
  message:string;

  ngOnInit() {
    this.getCategories()
    this.form = this.fb.group({
      category:['',Validators.required],
      state:['']
    });
  }
 
  async presentToast() {
    const toast = await this.toastController.create({
      message: this.message,
      duration: 2000
    });
    toast.present();
  }
  async openModal(form:InCategories){
    const modal =  await this.modalCtrl.create({
      component: ModalEditPage,
      componentProps:{
        _id:form.id,
       _category:form.category
      },
      cssClass: 'my-custom-modal-css',
    });
    await modal.present();
    const {data} = await modal.onDidDismiss();
    console.log('Retorno del modal',data);
    this.list.closeSlidingItems();
  }

  getCategories(){
    this.cs.getCategory().subscribe({
      next:(res:InCategories[])=> {this.categories = res},
      error:(err)=>console.log(err)    
    });
  }
  postCategory(){
       
    this.cs.postCategory(this.form.value).subscribe({
      next: (res) => {
        this.message = res['message'];
        this.presentToast();
        this.getCategories();
      },
      error: (err) => console.log(err)
    });
    
   this.form.reset();
  }
  showCategory(id:number){
    this.cs.showCategory(id).subscribe({
      next:(res:InCategories)=>{     
        this.openModal(res);
      },
      error:(err)=>console.log(err)
    });
  }
  delete(id:number){
    this.cs.deleteCategory(id).subscribe({
      next:(res)=>{this.message = res['message'];
        this.getCategories();
        this.presentToast();
      },
      error:(err)=>console.log(err)
      
    });
    this.list.closeSlidingItems();
    
  }

}
