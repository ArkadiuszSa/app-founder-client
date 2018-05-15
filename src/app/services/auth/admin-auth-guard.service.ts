import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import * as jwt from 'jsonwebtoken'

@Injectable()
export class AdminAuthGuardService implements CanActivate {
  constructor( private router: Router){

  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let token =localStorage.getItem('token');
    let decodedToken=jwt.decode(token)
    //let role=decodedToken.role;
    console.log(decodedToken);
    if(decodedToken==null){
      this.router.navigate(['/login/login-panel']);
      return false;
    }else{
      let role=decodedToken.role;
      if(role=='user'||role=='admin'){
        return true;
      }else{
        this.router.navigate(['/login/login-panel']);
        return false;
      }
    }
  }

  

}
