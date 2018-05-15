import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './/app-routing.module';
import { DomSanitizer} from '@angular/platform-browser';
import {
  HttpClientModule,
  HTTP_INTERCEPTORS 
} from '@angular/common/http';

import {
  ReactiveFormsModule,
  FormBuilder, 
  FormGroup, 
  Validators,
  FormsModule
}from '@angular/forms';



import {ENTER, COMMA} from '@angular/cdk/keycodes';

import { AppComponent } from './app.component';
import { UserComponent } from './components/adminPanel/user/user.component';
import { AddUserDialogComponent } from './components/adminPanel/user/add-user-dialog/add-user-dialog.component';
import { TeamComponent } from './components/adminPanel/team/team.component';
import { TeamFormComponent } from './components/adminPanel/team/team-form/team-form.component';
import { LoginPanelComponent } from './components/login-panel/login-panel.component';
import { TeamFormDialogComponent } from './components/adminPanel/team/team-form-dialog/team-form-dialog.component';
import { TeamsComponent } from './components/teams/teams.component';
import { UserSettingsComponent, UpdateUserFieldDialogComponent } from './components/user-settings/user-settings.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { InvitationsComponent } from './components/invitations/invitations.component';

import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';

import { UserService } from './services/user/user.service';
import { TeamService } from './services/team/team.service';
import { AuthService } from './services/auth/auth.service';
import { ProjectService } from './services/project/project.service';
import { InvitationsService } from './services/invitations/invitations.service';
import { OfferService } from './services/offer/offer.service';

import { UserAuthGuardService } from './services/auth/user-auth-guard.service';
import { AdminAuthGuardService } from './services/auth/admin-auth-guard.service';
import { AuthInterceptorService } from './services/auth/auth-interceptor.service';

import { GlobalService } from './services/global/global.service';

import {
  MatButtonModule,
  MatCheckboxModule,
  MatCardModule,
  MatDatepickerModule,
  MatGridListModule, 
  MatTableModule, 
  MatFormFieldModule,
  MatInputModule,
  MatPaginator,
  MatPaginatorModule,
  MatDialogModule, 
  MatIconModule, 
  MatMenuModule,
  MatDialog,
  MatIconRegistry,
  MatChipInputEvent,
  MatChipsModule,
  MatSelectModule,
  MatSliderModule,
  MatSlideToggleModule,


} from '@angular/material';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDividerModule} from '@angular/material/divider';

import { FlexLayoutModule } from "@angular/flex-layout";

import { TeamProfileComponent,JoinRequestDialogComponent } from './components/team-profile/team-profile.component';
import { UserTeamsListComponent,AddNewTeamDialogComponent } from './components/user-teams-list/user-teams-list.component';
import { TeamManageComponent,UpdateTeamFieldDialogComponent } from './components/team-manage/team-manage.component';
import { UserProjectsListComponent,AddNewProjectDialogComponent } from './components/user-projects-list/user-projects-list.component';
import { ProjectProfileComponent,SendOfferComponent } from './components/project-profile/project-profile.component';
import { UserProfileComponent, JoinTeamInvitationComponent } from './components/user-profile/user-profile.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { UsersComponent } from './components/users/users.component';
import { ProjectManageComponent } from './components/project-manage/project-manage.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginPanelComponent,
    UserComponent,
    AddUserDialogComponent,
    TeamComponent,
    TeamFormDialogComponent,
    TeamFormComponent,
    LoginLayoutComponent,
    AdminLayoutComponent,
    TeamsComponent,
    UserLayoutComponent,
    ProjectsComponent,
    SendOfferComponent,
    UserSettingsComponent,
    InvitationsComponent,
    TeamProfileComponent,
    JoinRequestDialogComponent,
    UserTeamsListComponent,
    AddNewTeamDialogComponent,
    TeamManageComponent,
    UpdateUserFieldDialogComponent,
    UpdateTeamFieldDialogComponent,
    UserProjectsListComponent,
    AddNewProjectDialogComponent,
    ProjectProfileComponent,
    UserProfileComponent,
    JoinTeamInvitationComponent,
    HomePageComponent,
    UsersComponent,
    ProjectManageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,

    MatButtonModule,
    MatCheckboxModule, 
    MatCardModule, 
    MatGridListModule, 
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatDialogModule,
    MatIconModule,
    MatIconModule, 
    MatMenuModule,
    MatStepperModule,
    MatDividerModule,
    MatChipsModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule

  ],
  entryComponents:[
    AddUserDialogComponent,
    UpdateUserFieldDialogComponent,
    UpdateTeamFieldDialogComponent,
    JoinRequestDialogComponent,
    SendOfferComponent,//dopisać dialog
    JoinTeamInvitationComponent,
    AddNewTeamDialogComponent,
    AddNewProjectDialogComponent
  ],
  providers: [
    GlobalService,
    AuthService,
    UserService,
    TeamService,
    ProjectService,
    InvitationsService,
    OfferService,
    
    
    AdminAuthGuardService,
    UserAuthGuardService,
    
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    } 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

