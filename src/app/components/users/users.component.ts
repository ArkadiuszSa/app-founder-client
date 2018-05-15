import { Component, OnInit } from '@angular/core';
import {UserService} from './../../services/user/user.service';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {GlobalService} from './../../services/global/global.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  public users;
  private url;
  constructor(
    private userService:UserService,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private globalService:GlobalService
  ){
    this.url=globalService.ASSETS_BASE;
    iconRegistry.addSvgIcon(
      'user-icon',
      sanitizer.bypassSecurityTrustResourceUrl(this.url+'img/userIcon.svg')
    );
  }

  ngOnInit() {
    this.reloadUserList();
  }

  reloadUserList(){
    this.userService.getUsers().subscribe(users=>{
      this.users=users;
      console.log(users)
    })
  }

}
