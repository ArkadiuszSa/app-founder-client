import { Component, OnInit,ViewChild } from '@angular/core';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {MatPaginatorModule, PageEvent,MatPaginator} from '@angular/material/paginator';
import {TeamService} from './../../services/team/team.service';
import {InvitationsService} from './../../services/invitations/invitations.service';
import {AuthService} from './../../services/auth/auth.service';
import {UserService} from './../../services/user/user.service';
import {Observable} from 'rxjs/Rx'
import {GlobalService} from './../../services/global/global.service';


@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  private url;
  public paginationProperties={
    pageSize:10,
    pageSizeOptions:[5, 10, 25, 100],
    length:100
  }
  public filtrOptions={
    search:{
      type:'search',
      value:''
    }
  }
  public sortOptions=[
    {name:'newly listed',type:'timestamp',value:-1},
    {name:'latest listed',type:'timestamp',value:1},
  ]
  public teams;
  public sortValue;
  private query={sort:{},filtr:{}};
  private from=0;
  private to=10;
  constructor(
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private teamService: TeamService,
    private invitationService: InvitationsService,
    private authService:AuthService,
    private userService:UserService,
    private globalService:GlobalService
  ){
    this.sortValue=this.sortOptions[0]; 
    this.url=globalService.ASSETS_BASE;
    globalService.pageTitle='Teams'
    iconRegistry.addSvgIcon(
      'team-icon',
      sanitizer.bypassSecurityTrustResourceUrl(this.url+'img/teamIcon.svg'));
    this.teams=[];
  }
    
  ngOnInit() {
    this.query.filtr=JSON.parse(JSON.stringify(this.filtrOptions))
    this.query.sort=this.sortValue;
    this.reloadTeamsList();
    this.teamService.getNumberOfTeams().subscribe(teamsNumber=>{
      this.paginationProperties.length=teamsNumber.value;
    })
  }

  reloadTeamsList(event?){
    if(event!==undefined){
      this.from=0;
      this.to=10;
      this.paginator.pageIndex=0;
      this.query.filtr=JSON.parse(JSON.stringify(this.filtrOptions))
    }
    
    this.query.sort=this.sortValue;
    this.teamService.getRangeOfTeamsFiltred(this.from,this.to,this.query).subscribe(res=>{
      this.teams=res.teams;
      this.teams.forEach(team => {
        team.registredDiff=this.globalService.getTimeDiff(team.timestamp);
        console.log(team.addedDiff)
      });

      this.paginationProperties.length=res.length;
      if(res.length<10){
        this.from=0;
        this.to=10;
      }
    })
  }
  paginationReload(event){ 
    this.from=event.pageIndex*event.pageSize;
    this.to=(event.pageIndex+1)*event.pageSize;
    this.reloadTeamsList();
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.paginationProperties.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }
}
