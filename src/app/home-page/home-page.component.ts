import { Component, OnInit } from '@angular/core';
import {MatIconRegistry, MatSnackBarModule,MatSnackBar} from '@angular/material';
import { Router } from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {GlobalService} from './../core/global/global.service';
import {HomePageService} from './home-page.service';

import {FormControl, FormGroup, FormBuilder, Validators,ReactiveFormsModule,FormGroupDirective,NgForm, AsyncValidatorFn, AbstractControl, ValidationErrors} from '@angular/forms';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss','./gallery.min.css','./gallery.theme.css']
})
export class HomePageComponent implements OnInit {
  private fullImagePath = '/assets/photos/main.jpg'
  private url;
  public messageForm: FormGroup;
  private sliderTextsList=[
    'Hire profesionalists to work for you',
    'Find interesting well-paid jobs.',
    'Create a team to deal with serious projects.'
  ];
  public usersNumber;
  public teamsNumber;
  public projectsNumber;
  public actualSliderText;
  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private globalService:GlobalService,
    private homePageService:HomePageService,
    private fb: FormBuilder,
    private router: Router,
    public emailSnackBar: MatSnackBar
  ) {
    
    this.url=globalService.ASSETS_BASE;
    this.actualSliderText=this.sliderTextsList[0];
    this.router.events.subscribe((val) =>{
      let routeLastChar=this.router.url.slice(-1);
      if(routeLastChar==='/'){
        this.switchSlide(1);
      }else{
        this.switchSlide(parseInt(routeLastChar));
      }
    } )
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
   
      this.messageForm = fb.group({
        userEmail:new FormControl(null, {
           validators: [Validators.required, Validators.email],
           updateOn: 'submit'
         }),
        message :new FormControl(null, {
           validators: [Validators.required],
           updateOn: 'submit'
         })
       });
    }
   

  ngOnInit(){
    let routeLastChar=this.router.url.slice(-1);
    if(routeLastChar==='/'){
      this.switchSlide(0);
    }else{
      this.switchSlide(parseInt(routeLastChar));
    }

    this.homePageService.getUsersNumber().subscribe(usersNumber=>{
      this.usersNumber=usersNumber.value;
    });
    this.homePageService.getTeamsNumber().subscribe(teamsNumber=>{
      this.teamsNumber=teamsNumber.value;
    });
    this.homePageService.getProjectsNumber().subscribe(projectsNumber=>{
      this.projectsNumber=projectsNumber.value;
    });
  }

  switchSlide(index:number){
    index--;
    if(index>2||index<0) index=0;
    this.actualSliderText=this.sliderTextsList[index];
  }

  sendEmail(){
    console.log('odpalam')
    if(this.messageForm.status==='VALID'){
          this.homePageService.sendEmail(this.messageForm.value).subscribe(res=>{
            console.log(res)
      if(res){

        this.openEmailSnackBar('Thank you for message. We will reply as soon as we can! ');
      }
    });
    }else{
      this.openEmailSnackBar('Please fill the form correctly.')
    }
  }

  openEmailSnackBar(message) {
    this.emailSnackBar.open(message, 'OK', {
      duration: 1000000,
    });
  }

  scroll(id){
    document.getElementById(id).scrollIntoView({behavior: 'smooth' });
  }

}
