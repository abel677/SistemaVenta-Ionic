import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from '../services/car.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {


  constructor
  (
    private cs:CarService, private route:Router
    
  ) { }

  _cars:any[];
  active:boolean = false;

  ngOnInit() {
   this.cs.getCars().subscribe({
    next:(res:any[])=> {
      this._cars = res;    
      if((this._cars.length >0)){
        this.active =true;
        
      }
    },
    error:(err)=>console.log(err)    
   });
  }
  formVenta(){
    this.route.navigate(['form-venta']);
  }

}
