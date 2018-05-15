import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from './../../services/project/project.service';
import { TeamService } from './../../services/team/team.service';
import { AuthService } from '../../services/auth/auth.service';
import { OfferService } from '../../services/offer/offer.service';

import {UserService} from './../../services/user/user.service';
import {MatDividerModule} from '@angular/material/divider';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatFormFieldModule} from '@angular/material';
import { Inject } from '@angular/core';
import * as moment from "moment"
import {Observable} from 'rxjs/Rx'


@Component({
  selector: 'app-project-profile',
  templateUrl: './project-profile.component.html',
  styleUrls: ['./project-profile.component.scss']
})
export class ProjectProfileComponent implements OnInit {
  private projectId;
  private project;
  private projectOwner;
  private teams=[];
  constructor(
    private route: ActivatedRoute, 
    private projectService:ProjectService,
    private userService:UserService,
    private teamService: TeamService,
    private offerService: OfferService,
    public dialog: MatDialog
  ){
    this.projectId = this.route.snapshot.params.id;
  }

  ngOnInit() {
    this.reloadProjectAndOfferts();
  }

  reloadProjectAndOfferts(){
    this.teams=[];
    this.projectService.getProject(this.projectId).flatMap(project=>{
      this.project=project;
      return this.userService.getUser(project.ownerId)
    })
    .subscribe(owner=>{
      this.projectOwner=owner;
    })

    this.offerService.getProjectOffers(this.projectId).concatMap(offers=>{
      return Observable.from(offers) 
    })
    .flatMap(offer=>{
      return this.teamService.getTeam(offer.teamId);
    })
    .subscribe(team=>{
      this.teams.push(team);
      
    })
  }

  openOfferDialog(): void {

    let dialogRef = this.dialog.open(SendOfferComponent, {
      width: "1000px",
      data:{projectTitle:this.project.title,projectId:this.project._id,notifedTeams:this.teams}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result==='addedOffer') this.reloadProjectAndOfferts();
         
    });
  }
}

@Component({
  selector: 'app-send-offer-dialog.component',
  templateUrl: './send-offer-dialog.component.html',
  styleUrls: ['./send-offer-dialog.component.scss']
})
export class SendOfferComponent implements OnInit {
  private userTeams;
  private projectTitle;
  private teams;
  private chosedTeam;
  private projectId;
  private offerDescription;
  private notifiedTeams;
  private notNotifiedAnyTeam:boolean;
  private teamSelectPlaceholder='Choose team';
constructor(
  @Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<SendOfferComponent>,
  private userService: UserService,
  private teamService: TeamService,
  private authService: AuthService,
  private offerService: OfferService
){
  this.projectTitle=data.projectTitle;
  this.projectId=data.projectId;
  this.notifiedTeams=data.notifedTeams;
  this.notNotifiedAnyTeam=false;
}

  ngOnInit(){
    let userId=this.authService.getUserId();
    this.teamService.getLeaderTeams(userId).subscribe(teams=>{
      this.userTeams=teams; 
      teams.forEach(team=>{
        this.notifiedTeams.forEach(notifiedTeam=>{
          if(team._id===notifiedTeam._id){
            this.notNotifiedAnyTeam=true;
            this.teamSelectPlaceholder='You can only send one offer and be a leader of team.';
          } 
        });
      });
    })
  }

  cancelOnClick(): void {

    this.dialogRef.close();
  }

  applyOnClick(){
    let timestamp=moment().format();
    let offer={
      projectId:this.projectId,
      teamId:this.chosedTeam._id,
      description:this.offerDescription,
       timestamp: timestamp
    }
    this.offerService.addNewOffer(offer).subscribe(res=>{
      this.dialogRef.close('addedOffer');

    }
     
    );







  }

}


