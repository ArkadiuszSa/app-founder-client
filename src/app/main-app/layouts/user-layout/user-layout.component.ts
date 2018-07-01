import { Component, OnInit, ViewChild } from '@angular/core';
import {AuthService} from './../../services/auth/auth.service';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {GlobalService} from './../../../core/global/global.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.scss']
})
export class UserLayoutComponent implements OnInit {
  public pageTitle;
  private url;
  public userId;
  constructor( 
    private authService: AuthService,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private globalService:GlobalService,
    private cdRef:ChangeDetectorRef

  ){
    this.url=globalService.ASSETS_BASE;

    iconRegistry.addSvgIcon(
      'menu-icon',
      sanitizer.bypassSecurityTrustResourceUrl(this.url+'img/menuIcon.svg'));
    iconRegistry.addSvgIcon(
      'logo',
      sanitizer.bypassSecurityTrustResourceUrl(this.url+'img/logo.svg'));
    iconRegistry.addSvgIcon(
      'email-icon',
      sanitizer.bypassSecurityTrustResourceUrl(this.url+'img/emailIcon.svg'));
    iconRegistry.addSvgIcon(
      'location-icon',
      sanitizer.bypassSecurityTrustResourceUrl(this.url+'img/locationIcon.svg'));
    iconRegistry.addSvgIcon(
      'account-icon',
      sanitizer.bypassSecurityTrustResourceUrl(this.url+'img/accountIcon.svg'));
    iconRegistry.addSvgIcon(
      'settings-icon',
      sanitizer.bypassSecurityTrustResourceUrl(this.url+'img/settingsIcon.svg'));
    iconRegistry.addSvgIcon(
      'projects-icon',
      sanitizer.bypassSecurityTrustResourceUrl(this.url+'img/projectMenuIcon.svg'));
    iconRegistry.addSvgIcon(
      'menu-team-icon',
      sanitizer.bypassSecurityTrustResourceUrl(this.url+'img/teamMenuIcon.svg'));
    iconRegistry.addSvgIcon(
      'invitation-icon',
      sanitizer.bypassSecurityTrustResourceUrl(this.url+'img/messageIcon.svg'));
    iconRegistry.addSvgIcon(
      'logout-icon',
      sanitizer.bypassSecurityTrustResourceUrl(this.url+'img/logoutIcon.svg'));

  }

  ngOnInit() {
    this.userId=this.authService.getUserId();
  }



  ngAfterViewChecked(){
    if(document.getElementById("loading-bar-spinner")) {
      let contentHeight=document.body.clientHeight;
      let loaderHeight=contentHeight-292;
      document.getElementById("loading-bar-spinner").style.height=loaderHeight+'px';
    }
    this.pageTitle=this.globalService.pageTitle;
    this.cdRef.detectChanges();

  }
  logout(){
    this.authService.logout();
  }
}

