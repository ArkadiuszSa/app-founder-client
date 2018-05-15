import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import * as jwt from 'jsonwebtoken'
import * as moment from "moment"

@Injectable()
export class UserAuthGuardService {
  constructor(
     private router: Router,
  ){
    
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let token =localStorage.getItem('token');
    let decodedToken=jwt.decode(token)
    
    
    if(decodedToken==null){
      console.log('niema tokena')
      this.router.navigate(['/login/login-panel']);

      return false;
    }
    else{
      moment.utc().format();
      let tokenExpired=!moment().isBefore(moment(decodedToken.exp),'seconds');
      let actualTime=moment().toDate().getTime()
      actualTime = (actualTime-(actualTime%1000))/1000;
      if(decodedToken.exp-actualTime<=0){
        this.router.navigate(['/login/login-panel']);
        return false;
      }
      else{
        return true;
        
      }
    }
  }
}
