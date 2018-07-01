import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GlobalService} from './../../../core/global/global.service';
import { IProjects } from './interfaces'
import {Observable} from 'rxjs/Rx'
import { map } from 'rxjs/operators'

interface IProjectData{
  projects:[{
    _id:string,
    timestamp:string,
    budget:{currency:string,value:string},
    deadline:string,
    description:string,
    status:string,
    technologies:[string]
    title:string
  }],
  length:number
  
}

export interface IProjectsService{
  getFiltredProjectsRange(from,to,query):Observable<IProjects>;
  getNumberOfProjects():Observable<Object>;
}

@Injectable()
export class ProjectsService implements IProjectsService {
  private url;
  constructor(
    private http: HttpClient,
    private globalService:GlobalService 
  ){
    this.url=globalService.API_BASE;
  }

  getNumberOfProjects(){
    return this.http.get<Object>(this.url+'projects-number');
  }

  getFiltredProjectsRange(from,to,query):Observable<IProjects>{
    return this.http.post<IProjectData>(this.url+'projects-range-filtred/'+from+'&'+to,query).pipe(
      map(project=>{
        return this.transformToIProjects(project)
      })
    )
  }

  private transformToIProjects(projectsData:IProjectData):IProjects{
    let projects={
      list:[],
      length:projectsData.length
    } as IProjects;

    for(let projectData of projectsData.projects){
      if(projectData.deadline) projectData.deadline=this.globalService.covertDateToDisplay(projectData.deadline);
      if(typeof(projectData.description)!=='undefined'&&projectData.description.length>300) projectData.description=projectData.description.substr(0,300)+'...';
      projects.list.push({
        _id:projectData._id,
        addedDiff:this.globalService.getTimeDiff(projectData.timestamp),
        budget:projectData.budget,
        deadline:projectData.deadline,
        description:projectData.description,
        title:projectData.title
      })
    }
    return projects;
  }
}
