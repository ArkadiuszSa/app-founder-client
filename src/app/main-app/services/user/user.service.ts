import { Injectable } from '@angular/core';
import { Http} from '@angular/http';
import { HttpModule } from '@angular/http';
import { HttpClientModule,HttpClient  } from '@angular/common/http';
import {GlobalService} from './../../../core/global/global.service';
@Injectable()
export class UserService {
  private url;
  constructor(
    private http: HttpClient,
    private globalService:GlobalService
  ){
    this.url=globalService.API_BASE;
  }

 getUsers(){
   return this.http.get<any[]>(this.url+'users')
     
 }

 getUser(_id){
   return this.http.get<any>(this.url+'user/'+_id)
     
 }

 getRangeOfUsersFiltred(from,to,querry){
  return this.http.post<any>(this.url+'users-range-filtred/'+from+'&'+to,querry)
}

 addNewUser(userData){
    return this.http.post(this.url+'user', userData)
    
 }

 updateUser(userData,id){
   return this.http.put(this.url+'user/'+id, userData)
   
 }

 deleteUser(id){
    return this.http.delete(this.url+'user/'+id)
    
 }





}
