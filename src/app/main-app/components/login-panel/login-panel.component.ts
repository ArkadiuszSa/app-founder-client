import { Component, OnInit,ViewChild } from '@angular/core';
import {FormControl, FormGroup, FormBuilder, Validators,ReactiveFormsModule,FormGroupDirective,NgForm, AsyncValidatorFn, AbstractControl, ValidationErrors} from '@angular/forms';
import {MatStepperModule} from '@angular/material/stepper';
import {UserService} from './../../services/user/user.service';
import {AuthService} from './../../services/auth/auth.service';
import {Router} from "@angular/router";
import { invalid } from 'moment';
import {ErrorStateMatcher} from '@angular/material/core';
import { Observable } from "rxjs/Observable";
import {GlobalService} from './../../../core/global/global.service';
import {setParticlesConfig} from "./../../../../assets/configs/particles"
declare var particlesJS: any;

export class ValidateEmailNotTaken {
  static createValidator(authService: AuthService) {
    return (control: AbstractControl) => {
      return authService.checkEmail({email:control.value}).subscribe(res => {
        if(res.response!=='notFinded'){
          return {emailTaken:true}
        }else{
          return null
        }
      });
    };
  }
}

export class User{
  email:string;
  password:string;
  passwordRepeat:string;
 
  constructor(){
    this.email = '';
    this.password='';
    this.passwordRepeat='';
  }
}

export function ContainNumber(control:AbstractControl){
  let containNumberRegex=/\d+/;
  let containBigLetterRegex=(/[A-Z]/);
  if( (!containNumberRegex.test(control.value)) || (!containBigLetterRegex.test(control.value)) ){
    return {notHaveNumber:true};
  }
  return null;
}


 

@Component({
  selector: 'app-login-panel',
  templateUrl: './login-panel.component.html',
  styleUrls: ['./login-panel.component.scss']
})
export class LoginPanelComponent implements OnInit  {
  registerForm: FormGroup;
  loginForm: FormGroup;
  isLoging: boolean;
  passwordCheck:boolean;
  usernameIsFree=true;
  submitedRegister=false;

  accountExist=false;
  unknowError=false;
  invalidLoginData=false;
  unknowLoginError=false;
  private user:User;
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private globalService:GlobalService,
    private router: Router,
    private fb: FormBuilder
  ){
    this.isLoging=false;
    this.registerForm = fb.group({
     email:new FormControl(null, {
        validators: [Validators.required, Validators.email],
        
        updateOn: 'submit'
      }),
     password :new FormControl(null, {
        validators: [Validators.required, Validators.minLength(8),ContainNumber],
        updateOn: 'submit'
      }),
     passwordRepeat :new FormControl(null, {
        validators: [Validators.required,Validators.minLength(8),ContainNumber],
        updateOn: 'submit'
      })
    });

    this.loginForm = fb.group({
      'email':new FormControl(null, {
         validators: [Validators.required],
         updateOn: 'submit'
       }),
      'password' :new FormControl(null, {
         validators: [Validators.required],
         updateOn: 'submit'
       })
     });

  }

  submitRegister(){
  this.submitedRegister=true
  if(this.registerForm.value.password===this.registerForm.value.passwordRepeat){
    this.passwordCheck=true;
    this.checkEmail();
  }else{
    this.passwordCheck=false
  }

  }
  async checkEmail(){
    let email=this.registerForm.value.email;
    await this.authService.checkEmail({email:email}).toPromise().then(res=>{
   
     let response=res.response;
      if(response==='finded'){
        this.accountExist=true;
      }else{
        this.accountExist=false;
      }
    
      if(this.accountExist===false && this.registerForm.status=="VALID"){
        let user=this.registerForm.value;
        user.timestamp=this.globalService.createTimestamp();
        this.authService.register(user);
        this.unknowError=true;
      }
    })
  }

  submitLogin(){
    this.authService.loginRequest(this.loginForm.value)
    .finally(()=>{
        this.invalidLoginData=true;
    })
    .subscribe(data=>{
      if(data.status===200){
        this.authService.login(data.body);
      }
    })
  }

  loginFlagChange(){
    this.isLoging=true;
  }

  registerFlagChange(){
     this.isLoging=false;
  }

  ngOnInit() {
    particlesJS('particles-js',setParticlesConfig());
  }
}
