import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InCategories } from '../interfaces/in-categories';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http:HttpClient) { }

  getCategory(){
    return this.http.get(`http://127.0.0.1:8000/api/categories`);
  }
  postCategory(form:InCategories){
    let params = new HttpParams()
    .set('category',form.category)
    return this.http.post(`http://127.0.0.1:8000/api/categories`,params);
  }
  deleteCategory(id:number){
    return this.http.delete(`http://127.0.0.1:8000/api/categories/${id}`);
  }
  showCategory(id:number){
    return this.http.get(`http://127.0.0.1:8000/api/categories/${id}`);
  }
  updateCategory(id:number,form:InCategories){

    let params = new HttpParams()
    .set('category',form.category)
    return this.http.put(`http://127.0.0.1:8000/api/categories/${id}`,params);
  }
}
