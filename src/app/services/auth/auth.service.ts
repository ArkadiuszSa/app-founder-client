import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import {GlobalService} from './../../services/global/global.service';

import * as jwt from 'jsonwebtoken'
import {Router} from "@angular/router";
import * as moment from "moment"

@Injectable()
export class AuthService {
  private url;
  constructor(
    private http: HttpClient,
    private router:Router,
    private globalService:GlobalService
  ){
    this.url=globalService.API_BASE;
  }

  login(loginFormValues){
    return this.http.post(this.url+'login',loginFormValues)
      .subscribe(data=>{
        this.setSession(data);
        this.router.navigateByUrl('/app/projects');
      })
    
  }

  public setSession(authResult) {
    var decoded = jwt.decode(authResult.token);
    localStorage.removeItem("token");
    localStorage.setItem('token', authResult.token);
  } 
  
  getTokenData(){
    let token =localStorage.getItem('token');
    return jwt.decode(token);
  }
  getUserId(){
    let token =localStorage.getItem('token');
    let decodedToken=jwt.decode(token);
    return decodedToken.id;
  }

  logout() {
    localStorage.removeItem("token");
    this.router.navigateByUrl('/login/login-panel');
  }



}

