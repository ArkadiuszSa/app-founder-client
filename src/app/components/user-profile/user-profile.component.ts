import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service'
import { TeamService } from './../../services/team/team.service';
import {AuthService} from './../../services/auth/auth.service';
import {InvitationsService} from './../../services/invitations/invitations.service';


import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatFormFieldModule } from '@angular/material';
import { Inject } from '@angular/core';
import * as moment from "moment"
import {Observable} from 'rxjs/Rx'

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  public user:any;
  private userId;
  constructor(
    private userService:UserService,
    private authService: AuthService,
    private route: ActivatedRoute, 
    public dialog: MatDialog
  ){

  }

  ngOnInit() {
    this.userId=this.route.snapshot.params.id;
    this.userService.getUser(this.userId).subscribe(user=>{
      this.user=user;
    })


  }

  openUserInvitationDialog(): void {
    let teamOwnerId=this.authService.getUserId();
    let dialogRef = this.dialog.open(JoinTeamInvitationComponent, {
      width: "1000px",
      data:{teamOwnerId:teamOwnerId,invitedUser:this.user}
    });

    dialogRef.afterClosed().subscribe(result => {
         
    });
  }

}

@Component({
  selector: 'app-join-team-request-dialog.component',
  templateUrl: './join-team-request-dialog.component.html',
  styleUrls: ['./join-team-request-dialog.component.scss']
})
export class JoinTeamInvitationComponent implements OnInit {
  public invitedUser;
  public teams=[];
  private teamOwnerId;
  public teamSelectPlaceholder='Choose team';
  public chosedTeam;
  public invitationContent;
constructor(
  @Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<JoinTeamInvitationComponent>,
  private userService: UserService,
  private teamService: TeamService,
  private invitationService:InvitationsService
){
  this.invitedUser=data.invitedUser;
  this.invitedUser=data.invitedUser;
  this.teamOwnerId=data.teamOwnerId;



}

  ngOnInit(){
    let invitations=[];
    this.invitationService.getUserInvitationsById(this.invitedUser._id).flatMap(invitations=>{
      invitations=invitations;
      return this.teamService.getUserTeams(this.teamOwnerId)
    })
    .concatMap(teams=>{
      return Observable.from(teams);
    }).subscribe(team=>{
      console.log(invitations)
      invitations.forEach(invitation=>{
        console.log(invitation)
        if((team.membersId.indexOf(this.invitedUser._id)===-1)&&(invitation.teamId!==team._id)){ 
          this.teams.push(team);
        }
    })
    if(invitations.length < 1 || invitations == undefined){
      if((team.membersId.indexOf(this.invitedUser._id)===-1)){ 
        this.teams.push(team);
      }
    }
      console.log(this.teams)
      if(this.teams.length===0) this.teamSelectPlaceholder="You don't have teams to invite this user"
    })
  }



  cancelOnClick(): void {

    this.dialogRef.close();
  }

  applyOnClick(){
    
    //this.invitationService.addNewInvitation()

  }

}
