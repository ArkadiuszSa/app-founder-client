import { Injectable } from '@angular/core';
import * as moment from "moment";
import { isDevMode } from '@angular/core';

@Injectable()
export class GlobalService {

  public pageTitle;

  // public API_BASE='http://localhost:4000/api/';
  // public ASSETS_BASE='http://localhost:4000/assets/';
    
  public API_BASE='https://app-founder-server.herokuapp.com/api/';
  public ASSETS_BASE='https://app-founder-server.herokuapp.com/assets/';
    

  changeTimestampFormat(date){
    return moment(date).format("DD-MM-YYYY");
  }

  createTimestamp(){
    return moment().format(); 
  }

  getTimeDiff(pastTime){
    let actualTime=moment();
    let diff=moment.duration(actualTime.diff(pastTime))
    let partialDate=[
      {value:diff.years(),name:'year'},
      {value:diff.months(),name:'month'},
      {value:diff.days(),name:'day'},
      {value:diff.hours(),name:'hour'},
      {value:diff.minutes(),name:'minute'},
      {value:diff.seconds(),name:'second'},
    ];

    for(let element of partialDate){
      if(element.value!==0){
        if(element.value>=2) element.name=element.name+'s';
        return (element.value+' '+element.name+' ago');
      }
    }
    return 'a moment ago';
  }

}
