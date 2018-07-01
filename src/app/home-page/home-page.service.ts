import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {GlobalService} from './../core/global/global.service';
import {Observable} from 'rxjs/Rx'

interface IEmailData{
  userEmail:string,
  message:string
}

@Injectable()
export class HomePageService {
  private url;
  constructor(
    private http: HttpClient,
    private globalService:GlobalService

  ){
    this.url=globalService.API_BASE;
  }

  sendEmail(email){
    return this.http.post<string>(this.url+'send-email',email);
  }

  getUsersNumber(){
    return this.http.get<any>(this.url+'users-number')
  }

  getTeamsNumber(){
    return this.http.get<any>(this.url+'teams-number')
  }

  getProjectsNumber(){
    return this.http.get<any>(this.url+'projects-number')
  }

}
