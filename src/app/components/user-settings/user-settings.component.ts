import { Component,ViewChild, OnInit, Inject,Input } from '@angular/core';
import {MatInputModule,MatInput} from '@angular/material/input';
import {MatDividerModule} from '@angular/material/divider';
import {MatChipInputEvent,MatChipsModule} from '@angular/material';
import {ENTER, COMMA} from '@angular/cdk/keycodes';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {FormGroup, FormControl, Validators,FormsModule } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatFormFieldModule} from '@angular/material';
import {GlobalService} from './../../services/global/global.service';

import {UserService} from './../../services/user/user.service';
import {AuthService} from './../../services/auth/auth.service';



@Component({
  selector: 'app-user-profile',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {
  editItemForm:FormGroup;
  private url;
  public userData;
    constructor(
      iconRegistry: MatIconRegistry,
      sanitizer: DomSanitizer,
      public dialog: MatDialog,
      private userService:UserService,
      private authService:AuthService,
      private globalService:GlobalService
    ){
      this.url=globalService.ASSETS_BASE;
      iconRegistry.addSvgIcon(
        'remove-chip-icon',
        sanitizer.bypassSecurityTrustResourceUrl(this.url+'img/removeChipIcon.svg'));
      iconRegistry.addSvgIcon(
        'update-icon',
        sanitizer.bypassSecurityTrustResourceUrl(this.url+'img/editIcon.svg'));
    }


  ngOnInit() {
    let userId=this.authService.getUserId();
    this.userService.getUser(userId).subscribe(user=>{
      this.userData=user;
    });
  }

  openUpdateFieldDialog(fieldName,fieldKey): void {
    let dialogWidth=(fieldName==='technologies')?('700px'):('500px');
    let fieldValue=this.userData[fieldKey];
    let dialogRef = this.dialog.open(UpdateUserFieldDialogComponent, {
      width: dialogWidth,
      data: { fieldName:fieldName,fieldValue:fieldValue  }
    });

    dialogRef.afterClosed().subscribe(updatedField => {
      console.log(updatedField)
      if(updatedField!==undefined){
        this.userData[fieldKey]=updatedField;
        let userId=this.authService.getUserId();
        this.userService.updateUser(this.userData,userId).subscribe();
      }
    });
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
  fruits:[string];
  
}

@Component({
  selector: 'update-user-field-dialog.component',
  templateUrl: 'update-user-field-dialog.component.html',
  styleUrls: ['update-user-field-dialog.component.scss']
})
export class UpdateUserFieldDialogComponent{
  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = true;
  separatorKeysCodes = [ENTER, COMMA];
 public fieldData;
  techs=[];

  constructor(
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    public dialogRef: MatDialogRef<UpdateUserFieldDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any){
      iconRegistry.addSvgIcon(
        'remove-chip-icon',
        sanitizer.bypassSecurityTrustResourceUrl('http://localhost:4000/assets/img/removeChipIcon.svg'));
      iconRegistry.addSvgIcon(
        'update-icon',
        sanitizer.bypassSecurityTrustResourceUrl('http://localhost:4000/assets/img/editIcon.svg'));
      console.log()

      
      if(data.fieldName==='technologies'){
        this.techs=data.fieldValue.slice();
        this.fieldData={name:''}
        this.fieldData.name=data.fieldName;
      } 
      else{
        this.fieldData={name:'',value:''}
        this.fieldData.name=data.fieldName;
        this.fieldData.value=data.fieldValue;
      }
      
      // console.log(this.techs)
      console.log(typeof(this.techs))
      console.log(this.techs)


    }
  
  cancelOnClick(): void {
    this.dialogRef.close();
    // console.log(this.techs);
    // console.log(this.fieldData)
  }

  applyOnClick(){
    if(this.fieldData.name==='technologies'){
      this.dialogRef.close(this.techs);
    } 
    else{
      this.dialogRef.close(this.fieldData.value);
    }
  }

  add(event: MatChipInputEvent): void {

    let input = event.input;
    let value = event.value;

    if ((value || '').trim()) {
      value=value.trim();
      this.techs.push( value );
    }

    if (input) {
      input.value = '';
    }
    // console.log(this.techs)
    // console.log(this.fieldData)
  }

  remove(tech: any): void {
    let index = this.techs.indexOf(tech);

    if (index >= 0) {
      this.techs.splice(index, 1);
    }
  }


}
