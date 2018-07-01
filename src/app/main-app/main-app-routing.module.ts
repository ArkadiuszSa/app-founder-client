import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginPanelComponent } from './components/login-panel/login-panel.component';
import { UserComponent } from './components/adminPanel/user/user.component';
import { TeamComponent } from './components/adminPanel/team/team.component';
import { UsersComponent } from './components/users/users.component';

import { TeamFormComponent } from './components/adminPanel/team/team-form/team-form.component';
import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { TeamsComponent } from './components/teams/teams.component';
import { TeamProfileComponent } from './components/team-profile/team-profile.component';
import { UserTeamsListComponent } from './components/user-teams-list/user-teams-list.component';
import { TeamManageComponent } from './components/team-manage/team-manage.component';

import { ProjectManageComponent } from './components/project-manage/project-manage.component';

import { InvitationsComponent } from './components/invitations/invitations.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { UserProjectsListComponent } from './components/user-projects-list/user-projects-list.component';
import { ProjectProfileComponent } from './components/project-profile/project-profile.component';

import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { UserSettingsComponent } from './components/user-settings/user-settings.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';


import { AdminAuthGuardService } from './services/auth/admin-auth-guard.service';
import { UserAuthGuardService } from './services/auth/user-auth-guard.service';

const routes: Routes = [
  {
    path:'',
    component:UserLayoutComponent,
    canActivate: [UserAuthGuardService],
    children:[
      { 
        path:'teams', 
        component:TeamsComponent,
      },
      { 
        path:'projects', 
        component:ProjectsComponent,
      },
      { 
        path:'users', 
        component:UsersComponent,
      },
      { 
        path:'user-projects-list', 
        component:UserProjectsListComponent,
      },
      { 
        path:'project-manage/:id', 
        component:ProjectManageComponent,
      },
      { 
        path:'project-profile/:id', 
        component:ProjectProfileComponent,
      },
      { 
        path:'user-settings', 
        component:UserSettingsComponent,
      },
      { 
        path:'user-profile/:id', 
        component:UserProfileComponent,
      },
      { 
        path:'team-profile/:id', 
        component:TeamProfileComponent,
      },
      { 
        path:'user-team-list',
        component:UserTeamsListComponent,
      },
      { 
        path:'team-manage/:id', 
        component:TeamManageComponent,
      },
      { 
        path:'invitations', 
        component:InvitationsComponent,
      }
    ]
  },
  {
    path:'admin',
    canActivate: [AdminAuthGuardService], 
    component:AdminLayoutComponent,
    children:[
      {
        path:'users', 
        component:UserComponent,
      },
      { 
        path:'teams', 
        component:TeamComponent
        // children:[
        //     { path: 'update-team/:id', component: TeamFormComponent },
        //     { path: 'add-new-team', component: TeamFormComponent }
        // ]
      },
      { path: 'update-team/:id', component: TeamFormComponent },
      { path: 'add-new-team', component: TeamFormComponent }
    ]
  },
  {
    path:'login', 
    component:LoginLayoutComponent,
    children:[
      { path: 'login-panel', component: LoginPanelComponent }

    ]
  },
  {
    path: '**', redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [ RouterModule ]
  
})

export class MainAppRoutingModule {}