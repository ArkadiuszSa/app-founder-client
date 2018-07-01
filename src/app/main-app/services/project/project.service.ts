import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GlobalService} from './../../../core/global/global.service';
@Injectable()
export class ProjectService {
  private url;
  constructor(
    private http: HttpClient,
    private globalService:GlobalService 
  ){
    this.url=globalService.API_BASE;
  }

  getProjects(){
    return this.http.get(this.url+'projects')
  }
  getRangeOfProjects(from,to){
   return this.http.get<any[]>(this.url+'projects-range/'+from+'&'+to)
  }
  getRangeOfProjectsFiltred(from,to,querry){
    return this.http.post<any>(this.url+'projects-range-filtred/'+from+'&'+to,querry)
  }
  getNumberOfProjects(){
    return this.http.get<any>(this.url+'projects-number')
  }

  getUserProjects(id){
    return this.http.get<any[]>(this.url+'user-projects/'+id)
  }

  getProject(id){
    return this.http.get<any>(this.url+'project/'+id)
  }
 
  addNewProject(projectData){
     return this.http.post(this.url+'project', projectData)
  }
 
  updateProject(projectData,id){
    return this.http.put(this.url+'project/'+id, projectData)
  }
 
  deleteProject(id){
     return this.http.delete(this.url+'project/'+id)
  }

}
