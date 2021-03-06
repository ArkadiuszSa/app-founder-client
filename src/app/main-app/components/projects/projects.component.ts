import { Component, OnInit,ViewChild } from '@angular/core';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {MatPaginatorModule, PageEvent,MatPaginator} from '@angular/material/paginator';
import {ProjectService} from './../../services/project/project.service';
import {ProjectsService} from '../projects/projects.service';

import {GlobalService} from './../../../core/global/global.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public paginationProperties={
    pageSize:10,
    pageSizeOptions:[5, 10, 25, 100],
    length:100
  }
  public sortOptions=[
    {name:'ending sonest',type:'deadline',value:-1},
    {name:'ending latest',type:'deadline',value:1},
    {name:'newly listed',type:'timestamp',value:-1},
    {name:'latest listed',type:'timestamp',value:1},
    {name:'lowest budget',type:'budget.value',value:1},
    {name:'hightes budget',type:'budget.value',value:-1}
  ]
  public filtrOptions={
    search:{
      type:'search',
      value:''
    },
    budget:{
      type:'budget.value',
      from:'',
      to:''
    },
    status:{
      value:''
    }
  }
  public statusOptions=[
    {name:'status',value:''},
    {name:'new',value:'new'},
    {name:'in progress',value:'inProgress'},
    {name:'finished',value:'finished'}
  ]
  public sortValue;  
  public projects:any;
  private url;
  private from=0;
  private to=10;
  private query={sort:{},filtr:{}};
  
  constructor( 
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private projectService: ProjectService,
    private projectsService: ProjectsService,
    private globalService:GlobalService
  ){ 
    this.filtrOptions.status=this.statusOptions[0];
    this.sortValue=this.sortOptions[0];
    globalService.pageTitle='Projects';
    this.url=globalService.ASSETS_BASE;
    iconRegistry.addSvgIcon(
      'project-icon',
      sanitizer.bypassSecurityTrustResourceUrl(this.url+'img/projectIcon.svg')
    );
  }

  ngOnInit() {

    this.query.filtr=JSON.parse(JSON.stringify(this.filtrOptions))
    this.query.sort=this.sortValue;
    this.reloadProjectsList();
    this.projectService.getNumberOfProjects().subscribe(projectsNumber=>{
      this.paginationProperties.length=projectsNumber.value;
    })
  }

  reloadProjectsList(event?){
    if(event!==undefined){
      this.from=0;
      this.to=10;
      this.paginator.pageIndex=0;
      this.query.filtr=JSON.parse(JSON.stringify(this.filtrOptions))
    }
    this.query.sort=this.sortValue;
    this.projectsService.getFiltredProjectsRange(this.from,this.to,this.query).subscribe(res=>{
      this.projects=res.list;
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
    this.reloadProjectsList();
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.paginationProperties.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

}
