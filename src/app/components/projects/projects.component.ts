import { Component, OnInit } from '@angular/core';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {ProjectService} from './../../services/project/project.service';
import {GlobalService} from './../../services/global/global.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  public paginationProperties={
    pageSize:10,
    pageSizeOptions:[5, 10, 25, 100],
    length:100
  }
  public projects:any;
  private dispProjects:any;
  private url;
  
  constructor( 
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private projectService: ProjectService,
    private globalService:GlobalService
  ){ 
    this.url=globalService.ASSETS_BASE;
    iconRegistry.addSvgIcon(
      'project-icon',
      sanitizer.bypassSecurityTrustResourceUrl(this.url+'img/projectIcon.svg')
    );
  }

  ngOnInit() {
    this.projectService.getRangeOfProjects(0,10).subscribe(res=>{
      this.projects=res;
    });
    this.projectService.getNumberOfProjects().subscribe(projectsNumber=>{
      console.log(projectsNumber)
      this.paginationProperties.length=projectsNumber.value;
    })

  }

  reloadProjectsList(event){ 
    let from=event.pageIndex*event.pageSize;
    let to=(event.pageIndex+1)*event.pageSize;
    this.projectService.getRangeOfProjects(from,to).subscribe(projects =>{
      this.projects=projects;
     
    });
    this.projectService.getNumberOfProjects().subscribe(projectsNumber=>{
      this.paginationProperties.length=projectsNumber.value;

    })


  }
setPageSizeOptions(setPageSizeOptionsInput: string) {
  this.paginationProperties.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
}

}
