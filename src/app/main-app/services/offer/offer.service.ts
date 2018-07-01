import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import {GlobalService} from './../../../core/global/global.service';

@Injectable()
export class OfferService {
  private url;
  constructor(
    private http: HttpClient,
    private globalService:GlobalService
  ){
    this.url=globalService.API_BASE;
   }

  getProjectOffers(projectId){
    return this.http.get<any[]>(this.url+'project-offers/'+projectId)
  }

  addNewOffer(offer){
    return this.http.post(this.url+'offer', offer)
 }
   
  updateOffer(id,offer){
    return this.http.put(this.url+'offer/'+id, offer)
  }

  deleteOffer(id){
    return this.http.delete(this.url+'offer/'+id)
 }

}