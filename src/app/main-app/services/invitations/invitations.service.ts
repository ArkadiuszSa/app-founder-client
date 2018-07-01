import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {HttpModule} from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import * as jwt from 'jsonwebtoken'
import {TeamService} from './../../services/team/team.service';
import {GlobalService} from './../../../core/global/global.service';

@Injectable()
export class InvitationsService {
  private url;
  constructor(
    private http: HttpClient,
    private teamService:TeamService,
    private globalService:GlobalService
  ){
    this.url=globalService.API_BASE;
  }

  getUserInvitations(){
    let token =localStorage.getItem('token');
    let decodedToken=jwt.decode(token);
    let userId=decodedToken.id;
    return this.http.get<any[]>(this.url+'user-invitations/'+userId)
  }

  getUserInvitationsById(userId){
    return this.http.get<any[]>(this.url+'user-invitations/'+userId)
  }

  getTeamInvitations(teamId){
    return this.http.get<any[]>(this.url+'team-invitations/'+teamId)
  }

  addNewInvitation(invitationData){
    return this.http.post(this.url+'invitation', invitationData)
 }
   
  updateInvitation(id,invitation){
    return this.http.put(this.url+'invitation/'+id, invitation)
  }

  deleteInvitation(id){
    return this.http.delete(this.url+'invitation/'+id)
 }

}

