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

import { HomePageService } from'./home-page/home-page.service';
import { GlobalService } from'./core/global/global.service';

import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { MaterialModule } from './material.module'
import { MatDatepickerModule }  from '@angular/material'

import { HomePageComponent } from './home-page/home-page.component';




@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,

    MaterialModule,
    MatDatepickerModule,

    LoadingBarHttpClientModule
  ],
  providers: [
    HomePageService,
    GlobalService,
    MatDatepickerModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

