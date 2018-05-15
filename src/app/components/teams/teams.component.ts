import { Component, OnInit } from '@angular/core';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';
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
  private url;

  public paginationProperties={
    pageSize:10,
    pageSizeOptions:[5, 10, 25, 100],
    length:100
  }
  public teams;
  constructor(
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private teamService: TeamService,
    private invitationService: InvitationsService,
    private authService:AuthService,
    private userService:UserService,
    private globalService:GlobalService
  ){
    this.url=globalService.ASSETS_BASE;
    iconRegistry.addSvgIcon(
      'team-icon',
      sanitizer.bypassSecurityTrustResourceUrl(this.url+'img/teamIcon.svg'));
    this.teams=[];
    }
    
  ngOnInit() {
    this.teamService.getRangeOfTeams(0,10).subscribe(teams=>{
      this.teams=teams;
    });
    this.teamService.getNumberOfTeams().subscribe(teamsNumber=>{
      this.paginationProperties.length=teamsNumber.value;
    })
  }
  reloadTeamsList(event){ 
    let from=event.pageIndex*event.pageSize;
    let to=(event.pageIndex+1)*event.pageSize;
    this.teamService.getRangeOfTeams(from,to).subscribe(teams=>{
      this.teams=teams;
    });
    this.teamService.getNumberOfTeams().subscribe(teamsNumber=>{
      this.paginationProperties.length=teamsNumber.value;
    })
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.paginationProperties.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }
}
