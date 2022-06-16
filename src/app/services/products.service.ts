import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InProducts } from '../interfaces/in-products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http:HttpClient) { }

  postProducts(form:InProducts){
    let params = new HttpParams()
    .set('description',form.description)
    .set('price',form.price)
    .set('id_categories',form.id_categories)
    return this.http.post(`http://127.0.0.1:8000/api/products`,params);
  }
  getProducts(){
    return this.http.get(`http://127.0.0.1:8000/api/products`);
  }
  showProduts(id:number){
    return this.http.get(`http://127.0.0.1:8000/api/products/${id}`);
  }
  updateProducts(id:number, form:InProducts){
    let params = new HttpParams()
    .set('description',form.description)
    .set('price',form.price)
    .set('id_categories',form.id_categories)
    return this.http.put(`http://127.0.0.1:8000/api/products/${id}`,params);
  }
  deleteProducts(id:number){
    return this.http.delete(`http://127.0.0.1:8000/api/products/${id}`);
  }
  editProducts(id:number){
    return this.http.get(`http://127.0.0.1:8000/api/products/${id}/edit`);
  }
}
