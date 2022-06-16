import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-venta',
  templateUrl: './form-venta.page.html',
  styleUrls: ['./form-venta.page.scss'],
})
export class FormVentaPage implements OnInit {

  constructor
  (
    private route:Router
  ) { }

  ngOnInit() {
  }
  back(){
    this.route.navigate(['folder/Inbox']);
  }

}
