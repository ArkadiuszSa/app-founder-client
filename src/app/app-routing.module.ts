import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePageComponent } from './home-page/home-page.component';

const routes: Routes = [
  {
    path:'',
    component:HomePageComponent
  },
  {
    path: 'app',
    loadChildren:'./main-app/main-app.module#MainAppModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
  
})

export class AppRoutingModule {}