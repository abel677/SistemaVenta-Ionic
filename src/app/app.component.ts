import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Inico', url: '/folder/Inbox', icon: 'home' },
   /*  { title: 'Registro categorias', url: '/categories', icon: 'add' },
    { title: 'Registro Productos', url: '/products', icon: 'add' }, */
    { title: 'Catálogo de Productos', url: '/catalogue', icon: 'add' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() {}
}
