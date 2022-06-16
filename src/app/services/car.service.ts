import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InCar } from '../interfaces/in-car';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private http:HttpClient) { }

  shoCars(id:number){
    return this.http.get(`http://127.0.0.1:8000/api/cars/${id}`);
  }
  postCars(form:InCar){
    let params = new HttpParams()
    .set('quantity',form.quantity)
    .set('total', form.total)
    .set('id_product', form.id_product)
    console.log(form);
    
    return this.http.post(`http://127.0.0.1:8000/api/cars`, params);
  }
  getCars(){
    return this.http.get(`http://127.0.0.1:8000/api/cars`);
  }

}
