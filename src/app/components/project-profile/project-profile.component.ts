import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from './../../services/project/project.service';
import { TeamService } from './../../services/team/team.service';
import { AuthService } from '../../services/auth/auth.service';
import { OfferService } from '../../services/offer/offer.service';
import {UserService} from './../../services/user/user.service';
import {GlobalService} from './../../services/global/global.service';
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
  public project;
  public projectOwner;
  public actualUserId;
  public teams=[];
  constructor(
    private route: ActivatedRoute, 
    private projectService:ProjectService,
    private userService:UserService,
    private teamService: TeamService,
    private authService: AuthService,
    private offerService: OfferService,
    private globalService: GlobalService,
    public dialog: MatDialog
  ){
    this.globalService.pageTitle='Project profile';
    this.projectId = this.route.snapshot.params.id;
    this.actualUserId=this.authService.getUserId();
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
      console.log(this.actualUserId)
      console.log(this.project.ownerId)
      console.log(this.actualUserId!==this.project.ownerId)
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
  public userTeams;
  public projectTitle;
  private teams;
  public chosedTeam;
  private projectId;
  public offerDescription;
  private notifiedTeams;
  public notNotifiedAnyTeam:boolean;
  public teamSelectPlaceholder='Choose team';
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
      if(teams.length===0){
        this.notNotifiedAnyTeam=true;
        this.teamSelectPlaceholder="You are not a leader of any team.";
      } 
      teams.forEach(team=>{
        this.notifiedTeams.forEach(notifiedTeam=>{
          if(team._id===notifiedTeam._id){
            this.notNotifiedAnyTeam=true;
            this.teamSelectPlaceholder='You can only send one offer on all your teams.';
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


