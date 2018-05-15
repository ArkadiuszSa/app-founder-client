import { Injectable } from '@angular/core';
import { Http,HttpModule} from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import {GlobalService} from './../../services/global/global.service';

@Injectable()
export class TeamService {
  private url;
  constructor(
    private http: HttpClient,
    private globalService:GlobalService
  ){
    this.url=globalService.API_BASE;
  }

 getTeams(){
   return this.http.get<any[]>(this.url+'teams') 
 }
 getRangeOfTeams(from,to){
  return this.http.get<any[]>(this.url+'teams-range/'+from+'&'+to)
 }

 getNumberOfTeams(){
  return this.http.get<any>(this.url+'teams-number')
 }

 getUserTeams(id){
  return this.http.get<any[]>(this.url+'teams-for-user/'+id)
 }

 getLeaderTeams(id){
  return this.http.get<any[]>(this.url+'teams-for-leader/'+id)
 }

 getTeam(_id){
   return this.http.get<any>(this.url+'team/'+_id)
 }

 addNewTeam(teamData){
    return this.http.post(this.url+'team', teamData)
 }

 updateTeam(id,teamData){
   return this.http.put(this.url+'team/'+id, teamData)
 }

 deleteTeam(id){
    return this.http.delete(this.url+'team/'+id)
 }

}
