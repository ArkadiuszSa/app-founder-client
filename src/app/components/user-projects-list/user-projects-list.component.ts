import { Component, OnInit } from '@angular/core';
import {TeamService} from './../../services/team/team.service';
import {ProjectService} from './../../services/project/project.service';
import {InvitationsService} from './../../services/invitations/invitations.service';
import {AuthService} from './../../services/auth/auth.service';
import {Observable} from 'rxjs/Rx'
import {MatDividerModule} from '@angular/material/divider';
import {MatChipInputEvent,MatChipsModule} from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatFormFieldModule} from '@angular/material';
import { FormGroup, FormControl, Validators,ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-projects-list',
  templateUrl: './user-projects-list.component.html',
  styleUrls: ['./user-projects-list.component.scss']
})
export class UserProjectsListComponent implements OnInit {
  public userProjects;
  public teamsProjects
  private userTeams;
  private user;
  constructor(
    private teamService: TeamService,
    private authService: AuthService,
    private invitationService:InvitationsService,
    private projectService:ProjectService,
    public dialog: MatDialog
  ){
    this.userProjects=[];
    this.userTeams=[];
    this.user=[];
    this.teamsProjects=[];

  }

  ngOnInit() {
    this.reloadUserProjectsList();
  }

  reloadUserProjectsList(){
    this.userProjects=[];
    this.teamsProjects=[];
    this.teamsProjects=[];
    let userId=this.authService.getUserId();
    this.teamService.getUserTeams(userId)
    .concatMap(teams=>{
      return Observable.from(teams);
    })
    .concatMap(team=>{
      let teamData={teamName:team.name,projectsId:team.projectsId}
      this.userTeams.push(teamData);
      return team.projectsId
    })
    .flatMap(projectId=>{
      return this.projectService.getProject(projectId)
    })
    .finally(()=>{
      
      this.teamsProjects.forEach(project => {
        this.userTeams.forEach(team=>{
          if(team.projectsId.includes(project._id)) project.teamName=team.teamName;
        })
      });
    })
    .subscribe(project=>{
      this.teamsProjects.push(project);
    })

    this.projectService.getUserProjects(userId).subscribe(projects=>{
     this.userProjects=projects;
    })
    
    
  }
  openAddNewProjectDialog(): void {
    let dialogRef = this.dialog.open(AddNewProjectDialogComponent, {
      width: "700px"
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result==='added') this.reloadUserProjectsList()
    });
  }


}
@Component({
  selector: 'app-add-new-project-dialog',
  templateUrl: './add-new-project-dialog.component.html',
  styleUrls: ['./add-new-project-dialog.component.scss']
})
export class AddNewProjectDialogComponent implements OnInit {

  newProjectForm: FormGroup;
  dialogHeader='Founding new project';
  constructor(
    public dialogRef: MatDialogRef<AddNewProjectDialogComponent>,
    private authService:AuthService,
    private projectService:ProjectService,

  ){

  }

  ngOnInit(){
    this.newProjectForm = new FormGroup ({
      title: new FormControl('', {
        validators: Validators.required,
        updateOn: 'blur'
      })
    });
    
  }
  cancelOnClick(): void {
    this.dialogRef.close('notAdded');
  }

  applyOnClick(){
    let project=this.newProjectForm.value;
    project.ownerId=this.authService.getUserId();
    this.projectService.addNewProject(project).subscribe();
    this.dialogRef.close('added');
  }


  
}

