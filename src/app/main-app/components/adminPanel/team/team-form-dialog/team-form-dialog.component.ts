import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import {TeamService} from './../../../../services/team/team.service';


import {MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatFormFieldModule} from '@angular/material';
import { FormGroup, FormControl, Validators,ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-team-form-dialog',
  templateUrl: './team-form-dialog.component.html',
  styleUrls: ['./team-form-dialog.component.css']
})
export class TeamFormDialogComponent implements OnInit {
  newTeamForm: FormGroup;
  dialogHeader;

  constructor(
    public dialogRef: MatDialogRef<TeamFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private teamService: TeamService) {

     }

     ngOnInit(){
      this.newTeamForm = new FormGroup ({
        name: new FormControl('', {
          validators: Validators.required,
          updateOn: 'blur'
        }),
        description: new FormControl('', {
          validators: Validators.required,
          updateOn: 'blur'
        }),
        
      });

      if(this.data.action==='addNewTeam'){
        this.dialogHeader='Adding new team';
      }else{

        
        this.dialogHeader='Updating existing team'
        this.teamService.getTeam(this.data.id).subscribe(res =>{
          this.newTeamForm.setValue({
            name: res.name,
            description: res.description
          });
        });

      }
  }
  closeDialog(): void {
    if(this.data.action==='addNewUser'){
      //console.log(this.newUserForm.value);
      this.teamService.addNewTeam(this.newTeamForm.value).subscribe();
    }else{
      //this.newUserForm.
      console.log(this.newTeamForm.value);
      console.log(this.data.id);
      this.teamService.updateTeam(this.newTeamForm.value,this.data.id).subscribe();
    }


    this.dialogRef.close();
  }
}
