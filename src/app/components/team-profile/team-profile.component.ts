import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {TeamService} from './../../services/team/team.service';
import {UserService} from './../../services/user/user.service';
import {AuthService} from './../../services/auth/auth.service';
import {InvitationsService} from './../../services/invitations/invitations.service';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatFormFieldModule} from '@angular/material';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-team-profile',
  templateUrl: './team-profile.component.html',
  styleUrls: ['./team-profile.component.scss']
})
export class TeamProfileComponent implements OnInit {
  private teamId:string;
  public team;
  private teamLeaderName:string;
  private teamRealtion;
  constructor(
    private route: ActivatedRoute, 
    private teamService: TeamService,
    private userService: UserService,
    private invitationService:InvitationsService,
    private authService:AuthService,
    public dialog: MatDialog,

  ){
    this.teamId = this.route.snapshot.params.id;
  }

  ngOnInit() {
    this.getTeamData();
  }

  async getTeamData(){
   
    let teamLeaderId=await this.teamService.getTeam(this.teamId).toPromise().then(team=>{
      this.team=team;
     return  team.teamLeaderId; 
    });

    await this.userService.getUser(teamLeaderId).toPromise().then(teamLeader=>{
      this.team.leaderName=teamLeader.fName+' '+teamLeader.lName;
    });

    await this.invitationService.getUserInvitations().toPromise().then(invitations=>{
      let userId=this.authService.getUserId();
      let userIndex=this.team.membersId.indexOf(userId);
      this.team.userRelation='notInTeam';
      if (userIndex !== -1){
        this.team.userRelation='alreadyInTeam';
      } 
      else if(userId===this.team.teamLeaderId){
        this.team.userRelation='teamLeader';  
      }
      else{
        invitations.forEach(invi=>{
          if(this.team._id===invi.teamId) this.team.userRelation='invitationInProgress';
        })
      }
    });

  }

  openJoinRequestDialog(): void {
    let dialogRef = this.dialog.open(JoinRequestDialogComponent, {
      width: "1000px",
      data:{teamId:this.team._id,teamName:this.team.name}
    });

    dialogRef.afterClosed().subscribe(updatedField => {
      this.getTeamData()
    });
  }
}

@Component({
  selector: 'app-join-request-dialog.component',
  templateUrl: './join-request-dialog.component.html',
  styleUrls: ['./join-request-dialog.component.scss']
})
export class JoinRequestDialogComponent implements OnInit {
  public requestContent:string;
  public teamName;
  private teamId;
constructor(
  @Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<JoinRequestDialogComponent>,
  private userService: UserService,
  private authService: AuthService,
  private invitationService: InvitationsService,

){
  this.teamName=data.teamName;
  this.teamId=data.teamId;
}

  ngOnInit(){

  }

  cancelOnClick(): void {
    this.dialogRef.close();
  }

  applyOnClick(){
    let userId=this.authService.getUserId();
    let invitation={
      userId:userId,
      teamId:this.teamId,
      state:'waitingOnTeam',
      description:this.requestContent,
      date:'noDate'
    }
    this.invitationService.addNewInvitation(invitation)
    .subscribe(invitation=>{
      console.log('odpaliło sie');
      this.dialogRef.close();
    })
    
  }

}
