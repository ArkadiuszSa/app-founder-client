import { Component,ViewChild, OnInit, Inject } from '@angular/core';
import {TeamService} from './../../../services/team/team.service';

import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import {MatTableDataSource,MatPaginator,MatIconModule} from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {TeamFormDialogComponent } from './team-form-dialog/team-form-dialog.component';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  public teamsData:Team[]=[
    {_id:'123123',name:'januszsoft',teamLeaderName:"janusz",numberOfMembers:2,numberOfProjects:3},
    {_id:'ddd',name:'januszsoftdf',teamLeaderName:"jddanusz",numberOfMembers:1,numberOfProjects:2}
  ]
  displayedColumns = ['id','name','teamLeaderName','numberOfMembers','numberOfProjects','actions'];
  teamsTableData =  new MatTableDataSource(this.teamsData);
  constructor(public dialog: MatDialog,iconRegistry: MatIconRegistry, sanitizer: DomSanitizer,
    private teamService: TeamService) {
    iconRegistry.addSvgIcon(
      'edit-icon',
      sanitizer.bypassSecurityTrustResourceUrl('http://localhost:4000/assets/img/editIcon.svg'));
      iconRegistry.addSvgIcon(
        'remove-icon',
        sanitizer.bypassSecurityTrustResourceUrl('http://localhost:4000/assets/img/removeIcon.svg'));
  }

  openDialog(action,id): void {
    var data;
    
    if(action==='addNewUser'){
      data={action};
    }else{
      data={action,id};
    }
    let dialogRef = this.dialog.open(TeamFormDialogComponent , {
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
    this.teamsTableData.filter = filterValue;
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngAfterViewInit() {
    this.teamsTableData.paginator = this.paginator;
  }

  reloadUsersTable(): void {
    this.teamService.getTeams().subscribe(res => {
      this.teamsData=res;
      this.teamsTableData =  new MatTableDataSource(this.teamsData);
    });
  }

  ngOnInit() {
    console.log(this.teamsData);
    console.log(this.teamsTableData);
    //this.displayedColumns = ['id','name','teamLeaderName','numberOfMembers','numberOfProjects','actions'];
   // this.teamsTableData =  new MatTableDataSource(this.teamsData);
  }

}

export interface Team {
  _id: string;
  name:string;
  teamLeaderName: string;
  numberOfMembers: number;
  numberOfProjects: number;
}
