import { Component, OnInit } from '@angular/core';
import { mergeMap } from 'rxjs/operators';
import 'rxjs/add/observable/of';
import {Observable} from 'rxjs/Rx'
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';

import {TeamService} from './../../services/team/team.service';
import {AuthService} from './../../services/auth/auth.service';
import {InvitationsService} from './../../services/invitations/invitations.service';
import {GlobalService} from './../../services/global/global.service';

@Component({
  selector: 'app-invitations',
  templateUrl: './invitations.component.html',
  styleUrls: ['./invitations.component.scss']
})
export class InvitationsComponent implements OnInit {
  public invitations=[];
  private url;
  constructor(
    private invitationsService:InvitationsService,
    private teamService:TeamService,
    private authService:AuthService,
    private globalService:GlobalService
,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ){
    this.url=globalService.ASSETS_BASE;

    iconRegistry.addSvgIcon(
      'remove-icon',
      sanitizer.bypassSecurityTrustResourceUrl(this.url+'img/removeIcon.svg')
    );
  }
  ngOnInit() {
    this.reloadInvitationsList()
    setTimeout(x=>{
      console.log(this.invitations)
      console.log('wchodzi')
      console.log(this.invitations.length)
    },300)
    console.log(this.invitations)
    console.log('wchodzi')
    console.log(this.invitations.length)
  }

  changeInviteStatusOnClick(i,newState){
    this.teamService.getTeam(this.invitations[i].teamId)
    .flatMap(team=>{
      let userId=this.authService.getUserId()
      team.membersId.push(userId)
      return this.teamService.updateTeam(this.invitations[i].teamId,team);
    })
    .subscribe();

    let invitation=this.invitations[i];
    invitation.state=newState;
    this.invitationsService.updateInvitation(this.invitations[i]._id, invitation)
    .subscribe(res=>{
      this.reloadInvitationsList();
    })
  }

  reloadInvitationsList(){
    let i=0;
    this.invitations=[];
    this.invitationsService.getUserInvitations()
    .concatMap(res=>{
      return Observable.from(res)
    })
    .concatMap(invitation=>{
      this.invitations.push(invitation);
      return this.teamService.getTeam(invitation.teamId)
    })
    .subscribe(data=>{
      this.invitations[i].teamName=data.name;
      i++;

    })
  }

  removeInvitationOnClik(i){
    this.invitationsService.deleteInvitation(this.invitations[i]._id).subscribe(res=>{
      this.reloadInvitationsList();
    });
  }

}
