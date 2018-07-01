import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//
//import { BrowserModule } from '@angular/platform-browser';

import { RouterModule, Routes } from '@angular/router';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { GlobalService } from './../core/global/global.service';
import { ProjectsService } from'./components/projects/projects.service';

import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { MaterialModule } from './material.module'
import { MatDatepickerModule }  from '@angular/material'

import { TeamProfileComponent,JoinRequestDialogComponent } from './components/team-profile/team-profile.component';
import { UserTeamsListComponent,AddNewTeamDialogComponent } from './components/user-teams-list/user-teams-list.component';
import { TeamManageComponent,UpdateTeamFieldDialogComponent } from './components/team-manage/team-manage.component';
import { UserProjectsListComponent,AddNewProjectDialogComponent } from './components/user-projects-list/user-projects-list.component';
import { ProjectProfileComponent,SendOfferComponent } from './components/project-profile/project-profile.component';
import { UserProfileComponent, JoinTeamInvitationComponent } from './components/user-profile/user-profile.component';
import { UsersComponent } from './components/users/users.component';
import { ProjectManageComponent, UpdateProjectFieldDialogComponent  } from './components/project-manage/project-manage.component';
//
import { MainAppRoutingModule } from './main-app-routing.module';

@NgModule({
  declarations: [
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
    UpdateProjectFieldDialogComponent,
    UserProjectsListComponent,
    AddNewProjectDialogComponent,
    ProjectProfileComponent,
    UserProfileComponent,
    JoinTeamInvitationComponent,
    UsersComponent,
    ProjectManageComponent,
    
  ],
  imports: [
    //BrowserModule,
    //BrowserAnimationsModule,
    CommonModule,
    MainAppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,

    MaterialModule,
    MatDatepickerModule,

    LoadingBarHttpClientModule

  ],
  entryComponents:[
    AddUserDialogComponent,
    UpdateUserFieldDialogComponent,
    UpdateTeamFieldDialogComponent,
    UpdateProjectFieldDialogComponent,
    JoinRequestDialogComponent,
    SendOfferComponent,//dopisać dialog
    JoinTeamInvitationComponent,
    AddNewTeamDialogComponent,
    AddNewProjectDialogComponent,
  ],
  providers: [
    GlobalService,
    AuthService,
    UserService,
    TeamService,
    ProjectService,
    ProjectsService,
    InvitationsService,
    OfferService,
    MatDatepickerModule,

    AdminAuthGuardService,
    UserAuthGuardService,
    
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    } 
  ]
})
export class MainAppModule { }
