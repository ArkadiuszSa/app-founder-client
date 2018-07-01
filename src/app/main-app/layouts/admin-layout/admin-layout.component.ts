import { Component } from '@angular/core';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';


@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent {

  constructor(
    iconRegistry: MatIconRegistry, 
    sanitizer: DomSanitizer
   
  ){
    iconRegistry.addSvgIcon(
      'menu-icon',
      sanitizer.bypassSecurityTrustResourceUrl('http://127.0.0.1:8887/img/menuIcon.svg'));
      
  }



}
