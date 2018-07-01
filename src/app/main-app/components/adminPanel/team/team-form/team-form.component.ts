import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import {TeamService} from './../../../../services/team/team.service';
import { ActivatedRoute } from '@angular/router';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatFormFieldModule} from '@angular/material';
import {MatTableDataSource,MatPaginator,MatIconModule} from '@angular/material';
import { FormGroup, FormControl, Validators,ReactiveFormsModule } from '@angular/forms';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
@Component({
  selector: 'app-team-form',
  templateUrl: './team-form.component.html',
  styleUrls: ['./team-form.component.css']
})
export class TeamFormComponent implements OnInit { 
  public teamData:Member[];
  displayedColumns = ['id', 'fName', 'lName', 'email','country','city', 'bDay','actions'];
  membersDataTable =  new MatTableDataSource(this.teamData);

  teamForm:FormGroup;
  param1: string;
  param2: string;
  public membersData:Member[];
  constructor(private route: ActivatedRoute, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer,) {
    this.param1 = this.route.snapshot.params.id;
    this.membersData=[{_id: '2343',fName: 'Adik',lName: 'Stromski',email: 'string',country: 'string',city: 'string',bDay: 'string'}]
    this.membersDataTable =  new MatTableDataSource(this.membersData);
    iconRegistry.addSvgIcon(
      'edit-icon',
      sanitizer.bypassSecurityTrustResourceUrl('http://localhost:4000/assets/img/editIcon.svg'));
      iconRegistry.addSvgIcon(
        'remove-icon',
        sanitizer.bypassSecurityTrustResourceUrl('http://localhost:4000/assets/img/removeIcon.svg'));
  }

  ngOnInit() {
    this.teamForm = new FormGroup ({
      name: new FormControl('', {
        validators: Validators.required,
        updateOn: 'blur'
      }),
      description: new FormControl('', {
        validators: Validators.required,
        updateOn: 'blur'
      }),
    
    });
    console.log('elo');
    console.log(this.param1);
  }

}
export interface Member {
  _id: string;
  fName: string;
  lName: string;
  email: string;
  country: string;
  city: string;
  bDay: string;
  
}
