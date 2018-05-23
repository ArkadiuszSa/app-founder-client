import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import {TeamService} from './../../services/team/team.service';
import {InvitationsService} from './../../services/invitations/invitations.service';
import {GlobalService} from './../../services/global/global.service';
import {AuthService} from './../../services/auth/auth.service';
import {Observable} from 'rxjs/Rx'
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatFormFieldModule} from '@angular/material';
import { FormGroup, FormControl, Validators,ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-user-teams-list',
  templateUrl: './user-teams-list.component.html',
  styleUrls: ['./user-teams-list.component.scss']
})
export class UserTeamsListComponent implements OnInit {
  public userTeams;
  constructor(
    private teamService: TeamService,
    private authService: AuthService,
    private invitationService:InvitationsService,
    public dialog: MatDialog,
    private globalService:GlobalService
  ){
    globalService.pageTitle='Teams list'

    this.userTeams=[];
  }

  ngOnInit() {
    this.reloadUserTeamList();
  }

  reloadUserTeamList(){
    this.userTeams=[]
    let userId=this.authService.getUserId();
    this.teamService.getUserTeams(userId)
    .concatMap(teams=>{
      return Observable.from(teams);
    })
    .subscribe(team=>{
      let userId=this.authService.getUserId();
      team.canManage=(userId===team.teamLeaderId)?true:false;
      this.userTeams.push(team);
    });
  }

  leaveTeamOnClick(teamIndex){
    let userId=this.authService.getUserId();
    let userIdIndex=this.userTeams[teamIndex].membersId.indexOf(userId)
    this.userTeams[teamIndex].membersId.splice(userIdIndex, 1);
    this.teamService.updateTeam(this.userTeams[teamIndex]._id,this.userTeams[teamIndex]).subscribe(res=>{
      this.reloadUserTeamList();
    })
    
  }

  openAddNewTeamDialog(): void {
    let dialogRef = this.dialog.open(AddNewTeamDialogComponent, {
      width: "700px"
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result==='added') this.reloadUserTeamList()
    });
  }

}

@Component({
  selector: 'app-add-new-team-dialog',
  templateUrl: './add-new-team-dialog.component.html',
  styleUrls: ['./add-new-team-dialog.component.scss']
})
export class AddNewTeamDialogComponent implements OnInit {

  newTeamForm: FormGroup;
  dialogHeader='Founding new team';
  constructor(
    public dialogRef: MatDialogRef<AddNewTeamDialogComponent>,
    private teamService:TeamService,
    private authService:AuthService
  ){

  }

  ngOnInit(){
    this.newTeamForm = new FormGroup ({
      name: new FormControl('', {
        validators: Validators.required,
        updateOn: 'blur'
      })
    });
    
  }
  cancelOnClick(): void {
    this.dialogRef.close('notAdded');
  }

  applyOnClick(){
    let team=this.newTeamForm.value;
    team.teamLeaderId=this.authService.getUserId();

    this.teamService.addNewTeam(team).subscribe(res=>{
      console.log(res);
    })
    this.dialogRef.close('added');
  }


  
}
