import { Component, OnInit } from '@angular/core';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {GlobalService} from './../../services/global/global.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss','./scroll-arrow.scss']
})
export class HomePageComponent implements OnInit {
  private fullImagePath = '/assets/photos/main.jpg'
  private url;
  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private globalService:GlobalService
  ) {
    this.url=globalService.ASSETS_BASE;

    iconRegistry.addSvgIcon(
      'logo',
      sanitizer.bypassSecurityTrustResourceUrl(this.url+'img/logo.svg'));
    iconRegistry.addSvgIcon(
      'idea-icon',
      sanitizer.bypassSecurityTrustResourceUrl(this.url+'img/idea-icon.svg'));
    iconRegistry.addSvgIcon(
      'worker-icon',
      sanitizer.bypassSecurityTrustResourceUrl(this.url+'img/worker-icon.svg'));
    iconRegistry.addSvgIcon(
      'teamwork-icon',
      sanitizer.bypassSecurityTrustResourceUrl(this.url+'img/teamwork-icon.svg'));
    iconRegistry.addSvgIcon(
      'email-icon',
      sanitizer.bypassSecurityTrustResourceUrl(this.url+'img/emailIcon.svg'));
    iconRegistry.addSvgIcon(
      'location-icon',
      sanitizer.bypassSecurityTrustResourceUrl(this.url+'img/locationIcon.svg'));
    iconRegistry.addSvgIcon(
      'next-icon',
      sanitizer.bypassSecurityTrustResourceUrl(this.url+'img/nextIcon.svg'));
   }
   

  ngOnInit() {
    
  }

  scroll(section){
    document.getElementById(section).scrollIntoView({ behavior: 'smooth'});
  }

}
