import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { InProducts } from 'src/app/interfaces/in-products';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-modal-cars',
  templateUrl: './modal-cars.page.html',
  styleUrls: ['./modal-cars.page.scss'],
})
export class ModalCarsPage implements OnInit {

  @Input() _products:InProducts
  
  _cantidad:number = 0;
  _total:number = 0;

  constructor
  (
    private modalCtrl:ModalController, private cs:CarService,
    private fb:FormBuilder
  ) { }

  form:FormGroup;

  ngOnInit() {
    this.form = this.fb.group({
      quantity:[''],
      total:[''],
      id_product:['']
    });
    
  }
  closeModal(){
    this.modalCtrl.dismiss();
    this.form.controls['quantity'].setValue(this._cantidad);
    this.form.controls['total'].setValue(this._total);
    this.form.controls['id_product'].setValue(this._products.id);

    console.log(this.form.value);    
    
      this.cs.postCars(this.form.value).subscribe({
      next:(res)=>console.log(res),
      error:(err)=>console.log(err)      
      
    });
  }
  remove(){
    if(this._cantidad > 0){
      this._cantidad -= 1;
      this._total -= (this._products.price *1);
    }
  }
  add(){
    this._cantidad += 1;
    this._total = (this._products.price *1)*(this._cantidad);
       
  }

}
