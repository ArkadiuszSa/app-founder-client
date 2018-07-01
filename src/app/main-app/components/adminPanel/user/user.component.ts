import { Component,ViewChild, OnInit, Inject } from '@angular/core';
import {UserService} from './../../../services/user/user.service';

import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import {MatTableDataSource,MatPaginator,MatIconModule} from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { AddUserDialogComponent } from './add-user-dialog/add-user-dialog.component';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})



export class UserComponent implements OnInit {
  public usersData: User[];

  displayedColumns = ['id', 'fName', 'lName', 'email','country','city', 'bDay','actions'];
  dataSource =  new MatTableDataSource(this.usersData);
  constructor(public dialog: MatDialog,iconRegistry: MatIconRegistry, sanitizer: DomSanitizer,
    private usersService: UserService) {
    iconRegistry.addSvgIcon(
      'edit-icon',
      sanitizer.bypassSecurityTrustResourceUrl('http://localhost:4000/assets/img/editIcon.svg'));
    iconRegistry.addSvgIcon(
      'remove-icon',
      sanitizer.bypassSecurityTrustResourceUrl('http://localhost:4000/assets/img/removeIcon.svg'));
  }
  
  openDialog(action,id?): void {
    var data;
    
    if(action==='addNewUser'){
      data={action};
    }else{
      data={action,id};
    }
    let dialogRef = this.dialog.open(AddUserDialogComponent , {
      width: '600px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      this.reloadUsersTable();

    });
  }


  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit() {
    this.reloadUsersTable();
  }

  reloadUsersTable(): void {
    this.usersService.getUsers().subscribe(res => {
      this.usersData=res;
      this.dataSource =  new MatTableDataSource(this.usersData);
    });
  }
  
  deleteUser(id): void {
    this.usersService.deleteUser(id).subscribe(res=>this.reloadUsersTable());
  }
}



export interface User {
  _id: string;
  fName: string;
  lName: string;
  email: string;
  country: string;
  city: string
  bDay: string;
  
}






