import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import {UserService} from './../../../../services/user/user.service';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatFormFieldModule} from '@angular/material';
import { FormGroup, FormControl, Validators,ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.css']
})
export class AddUserDialogComponent implements OnInit {

  newUserForm: FormGroup;
  dialogHeader;
  constructor(
    public dialogRef: MatDialogRef<AddUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private usersService: UserService) {

     }

    ngOnInit(){
      this.newUserForm = new FormGroup ({
        fName: new FormControl('', {
          validators: Validators.required,
          updateOn: 'blur'
        }),
        lName: new FormControl('', {
          validators: Validators.required,
          updateOn: 'blur'
        }),
        email: new FormControl('', {
          validators: Validators.required,
          updateOn: 'blur'
        }),
        country: new FormControl('', {
          validators: Validators.required,
          updateOn: 'blur'
        }),
        city: new FormControl('', {
          validators: Validators.required,
          updateOn: 'blur'
        }),
        bDay: new FormControl('', {
          validators: Validators.required,
          updateOn: 'blur'
        }),
      });

      if(this.data.action==='addNewUser'){
        this.dialogHeader='Adding new user';
      }else{

        
        this.dialogHeader='Updating existing user'
        this.usersService.getUser(this.data.id).subscribe(res =>{
          this.newUserForm.setValue({
            fName: res.fName,
             lName: res.lName,
             email: res.email,
             country: res.country,
             city:res.city,
             bDay:res.bDay
          });
        });
      }
  }
  closeDialog(): void {
    if(this.data.action==='addNewUser'){
      this.usersService.addNewUser(this.newUserForm.value).subscribe();
    }else{
      this.usersService.updateUser(this.newUserForm.value,this.data.id).subscribe();
    }


    this.dialogRef.close();
  }
  
}
