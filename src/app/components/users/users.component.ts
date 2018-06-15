import { Component, OnInit,ViewChild } from '@angular/core';
import {UserService} from './../../services/user/user.service';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {GlobalService} from './../../services/global/global.service';
import {MatPaginatorModule, PageEvent,MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  public users;
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
  public sortValue;
  private query={sort:{},filtr:{}};
  private from=0;
  private to=10;
  constructor(
    private userService:UserService,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private globalService:GlobalService
  ){
    this.sortValue=this.sortOptions[0];
    this.url=globalService.ASSETS_BASE;
    globalService.pageTitle='Users'

    iconRegistry.addSvgIcon(
      'user-icon',
      sanitizer.bypassSecurityTrustResourceUrl(this.url+'img/userIcon.svg')
    );
  }

  ngOnInit() {
    this.query.filtr=JSON.parse(JSON.stringify(this.filtrOptions))
    this.query.sort=this.sortValue;
    this.reloadUsersList();
  }



  reloadUsersList(event?){
    if(event!==undefined){
      this.from=0;
      this.to=10;
      this.paginator.pageIndex=0;
      this.query.filtr=JSON.parse(JSON.stringify(this.filtrOptions))
    }
    
    this.query.sort=this.sortValue;
    this.userService.getRangeOfUsersFiltred(this.from,this.to,this.query).subscribe(res=>{
      this.users=res.users;
      this.users.forEach(user => {
        user.registredDiff=this.globalService.getTimeDiff(user.timestamp);
        if(typeof(user.description)!=='undefined'&&user.description.length>300){
          user.description=user.description.substr(0,300)+'...'
        }
        if(user.technologies.length>4){
          user.technologies=user.technologies.slice(0,8)
        }
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
    this.reloadUsersList();
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.paginationProperties.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

}
