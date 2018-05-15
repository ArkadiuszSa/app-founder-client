import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';

import {TeamService} from './../../services/team/team.service';
import {UserService} from './../../services/user/user.service';
import {AuthService} from './../../services/auth/auth.service';
import {GlobalService} from './../../services/global/global.service';

import { ActivatedRoute } from '@angular/router';
import {Router} from "@angular/router";

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatFormFieldModule} from '@angular/material';
import {MatTableDataSource,MatPaginator,MatIconModule} from '@angular/material';
import { FormGroup, FormControl, Validators,ReactiveFormsModule } from '@angular/forms';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {Observable} from 'rxjs/Rx'

import {ENTER, COMMA} from '@angular/cdk/keycodes';

@Component({
  selector: 'app-team-manage-panel',
  templateUrl: './team-manage.component.html',
  styleUrls: ['./team-manage.component.scss']
})
export class TeamManageComponent implements OnInit {
  private url;
  public teamData:any;
  private teamId:string;
  displayedColumns = ['fName', 'lName', 'email','country','city', 'bDay','actions'];
  public membersDataTable;
  public membersData:Member[];
  public visabilityLabel='default'; 
  public visabilityState=false;

  constructor(
    private route: ActivatedRoute, 
    iconRegistry: MatIconRegistry, 
    sanitizer: DomSanitizer,
    public dialog: MatDialog,
    private teamService:TeamService,
    private userService:UserService,
    private authService:AuthService,
    private router: Router,
    private globalService:GlobalService
  ){
    this.teamId = this.route.snapshot.params.id;
    this.membersData=[];
    this.url=globalService.ASSETS_BASE;
    iconRegistry.addSvgIcon(
      'update-icon',
      sanitizer.bypassSecurityTrustResourceUrl(this.url+'img/editIcon.svg'));
    iconRegistry.addSvgIcon(
      'remove-icon',
      sanitizer.bypassSecurityTrustResourceUrl(this.url+'img/removeIcon.svg'));
  }

  ngOnInit() {
    this.reloadTeam();
  }
  reloadTeam(){
    this.membersData=[];
    this.teamService.getTeam(this.teamId)
    .concatMap(team=>{
      this.teamData=team;
      if(team.visable===true){
        this.visabilityLabel='Project is visable to others';
        this.visabilityState=true;
      }else{
        this.visabilityLabel='Project is not visable to others';
        this.visabilityState=false;
      }
      return Observable.from(team.membersId);
    })
    .flatMap(memberId=>{
      return this.userService.getUser(memberId);
    })
    .subscribe(member=>{
      this.membersData.push(member)
      this.membersDataTable =  new MatTableDataSource(this.membersData);

    })
  }

  openUpdateFieldDialog(fieldName,fieldKey): void {
    let dialogWidth='500px';
    let fieldValue=this.teamData[fieldKey];
    let dialogRef = this.dialog.open(UpdateTeamFieldDialogComponent, {
      width: dialogWidth,
      data: { fieldName:fieldName,fieldValue:fieldValue  }
    });

    dialogRef.afterClosed().subscribe(updatedField => {
      if(updatedField!==undefined){
        this.teamData[fieldKey]=updatedField;
        let userId=this.authService.getUserId();
        this.teamService.updateTeam(this.teamId,this.teamData).subscribe();
      }
    });
  }

  removeThisTeam(){
    this.teamService.deleteTeam(this.teamId).subscribe(res=>{
      this.router.navigateByUrl('/app/team-panel');
    })
  }
  changeVisability(){
    let team=this.teamData;
    team.visable= !team.visable;
    this.teamService.updateTeam(team._id,team).subscribe(res=>{
      this.reloadTeam();
    })
  }


  
}
export interface Member {
  _id: string;
  fName: string;
  lName: string;
  email: string;
  country: string;
  city: string;
  bDay: string;
  
 }


@Component({
  selector: 'update-team-field-dialog.component',
  templateUrl: 'update-team-field-dialog.component.html',
  styleUrls: ['update-team-field-dialog.component.scss']
})
export class UpdateTeamFieldDialogComponent{
  public fieldData;
  constructor(
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    public dialogRef: MatDialogRef<UpdateTeamFieldDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){
      this.fieldData={name:'',value:''}
      this.fieldData.name=data.fieldName;
      this.fieldData.value=data.fieldValue;
      console.log(this.fieldData);
    }
  
  cancelOnClick(): void {
    this.dialogRef.close();
  }

  applyOnClick(){
      this.dialogRef.close(this.fieldData.value);
  }


}


