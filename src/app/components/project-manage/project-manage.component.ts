import { Component, OnInit } from '@angular/core';
import { ProjectService } from './../../services/project/project.service';
import {UserService} from './../../services/user/user.service';
import {OfferService} from './../../services/offer/offer.service';
import {TeamService} from './../../services/team/team.service';
import {GlobalService} from './../../services/global/global.service';
import {Router} from "@angular/router";
import { ActivatedRoute } from '@angular/router';
import {Observable} from 'rxjs/Rx'
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import { Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatFormFieldModule} from '@angular/material';
import {MatChipInputEvent,MatChipsModule} from '@angular/material';
import {ENTER, COMMA} from '@angular/cdk/keycodes';
import {MatInputModule,MatInput} from '@angular/material/input';


@Component({
  selector: 'app-project-manage',
  templateUrl: './project-manage.component.html',
  styleUrls: ['./project-manage.component.scss']
})
export class ProjectManageComponent implements OnInit {
  public pageTitle;
  public project;
  private projectId;
  private offers=[];
  private teams=[];
  public teamsOffers=[];
  public visabilityLabel='default'; 
  public visabilityState=false;
  private url;

  constructor(
    private projectService: ProjectService,
    private userService: UserService,
    private route: ActivatedRoute,
    private offerService:OfferService,
    private teamService:TeamService,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private router: Router,
    private globalService:GlobalService,
    public dialog: MatDialog

  ){
    this.url=globalService.ASSETS_BASE;
    globalService.pageTitle='Project manage';
    this.projectId=this.route.snapshot.params.id;
   
    iconRegistry.addSvgIcon(
      'update-icon',
      sanitizer.bypassSecurityTrustResourceUrl(this.url+'img/editIcon.svg'));
  }

  ngOnInit() {
    this.reloadProject();
    this.reloadOffers();
  }
  reloadProject(){
    this.projectService.getProject(this.projectId).subscribe(project=>{
      this.project=project;
      if(project.visable===true){
        this.visabilityLabel='Project is visable to others';
        this.visabilityState=true;
      }else{
        this.visabilityLabel='Project is not visable to others';
        this.visabilityState=false;
      }
    })
  }

  reloadOffers(){
    this.teamsOffers=[];
    this.teams=[]
    this.offerService.getProjectOffers(this.projectId).concatMap(offers=>{
      this.offers=offers;
      return Observable.from(offers);
    })
    .flatMap(offer=>{
      return this.teamService.getTeam(offer.teamId)
    })
    .finally(()=>{
      this.offers.forEach(offer => {
        this.teams.forEach(team => {
         
          if(team._id===offer.teamId){
            offer.team=team
            this.teamsOffers.push(offer)
          } 
        });
      });
    })
    .subscribe(team=>{
      this.teams.push(team);
    })
  }

  removeThisProject(){
    this.projectService.deleteProject(this.project._id).subscribe(res=>{
      this.router.navigateByUrl('/app/user-projects-list');
    });
  }

  changeVisability(){
    let project=this.project;
    project.visable= !project.visable;
    this.projectService.updateProject(project,project._id).subscribe(res=>{
      this.reloadProject();
    })
  }



  acceptOffer(teamOffer){
    let {team, ...offer}=teamOffer;
    offer.state='accepted';
    this.project.status='inProgress';
    this.projectService.updateProject(this.project,this.project._id).subscribe(res=>{
      this.reloadProject();
    })
    this.offerService.updateOffer(offer._id,offer).subscribe(res=>{
      this.reloadOffers();
    })
    team.projectsId.push(this.project._id);
    this.teamService.updateTeam(team._id,team).subscribe();
  }

  rejectOffer(teamOffer){
    let {team, ...offer}=teamOffer;
    offer.state='rejected';
    this.offerService.updateOffer(offer._id,offer).subscribe(res=>{
      this.reloadOffers();
    })
  }


  openUpdateFieldDialog(fieldName,fieldKey): void {
    let dialogRef = this.dialog.open(UpdateProjectFieldDialogComponent, {
      width: '500px',
      data: {fieldName:fieldName,fieldKey:fieldKey,project:this.project  }
    });

    dialogRef.afterClosed().subscribe(updatedField => {
      if(updatedField!==undefined){
        this.reloadProject();
      }
    });
  }
}


@Component({
  selector: 'update-project-field-dialog.component',
  templateUrl: 'update-project-field-dialog.component.html',
  styleUrls: ['update-project-field-dialog.component.scss']
})
export class UpdateProjectFieldDialogComponent{
  public fieldData;
  public fieldName;
  public fieldValue;
  private fieldKey;
  private project;
  public technologies;
  private url;
  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = true;
  separatorKeysCodes = [ENTER, COMMA];

  constructor(
    globalService:GlobalService,
    sanitizer: DomSanitizer,
    public dialogRef: MatDialogRef<UpdateProjectFieldDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private projectService: ProjectService,
    iconRegistry: MatIconRegistry,
  ){
      this.url=globalService.ASSETS_BASE;
      this.technologies=data.project.technologies;
      this.fieldKey=data.fieldKey
      this.fieldName=data.fieldName;
      this.fieldValue=data.project[data.fieldKey];
      this.project=data.project;
      iconRegistry.addSvgIcon(
        'remove-chip-icon',
        sanitizer.bypassSecurityTrustResourceUrl(this.url+'img/removeChipIcon.svg'));
    }
  
  cancelOnClick(): void {
    this.dialogRef.close();
  }

  applyOnClick(){
    this.project[this.fieldKey]=this.fieldValue
    this.projectService.updateProject(this.project,this.project._id).subscribe();
    this.dialogRef.close('updated');
  }

  add(event: MatChipInputEvent): void {
    let input = event.input;
    let value = event.value;

    if ((value || '').trim()) {
      value=value.trim();
      this.technologies.push( value );
    }

   
    if (input) {
      input.value = '';
    }
  }

  remove(tech: any): void {
    let index = this.technologies.indexOf(tech);

    if (index >= 0) {
      this.technologies.splice(index, 1);
    }
  }
}




