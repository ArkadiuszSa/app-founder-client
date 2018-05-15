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
@Component({
  selector: 'app-project-manage',
  templateUrl: './project-manage.component.html',
  styleUrls: ['./project-manage.component.scss']
})
export class ProjectManageComponent implements OnInit {
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
    private globalService:GlobalService



  ){
    this.url=globalService.ASSETS_BASE;
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

  openUpdateFieldDialog(par1?,par2?){

  }


 
  }


