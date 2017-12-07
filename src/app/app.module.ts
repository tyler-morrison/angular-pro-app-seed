import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { Store } from 'store';

// feature modules

// containers
import { AppComponent } from './containers/app/app.component';

// components

// routes
export const ROUTES: Routes = [];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES)
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    Store
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}

/*
* var config = {
    apiKey: "AIzaSyBbk43IosWkKrLBai4MtOAmMkeV2vTrM5I",
    authDomain: "fitness-app-56ba9.firebaseapp.com",
    databaseURL: "https://fitness-app-56ba9.firebaseio.com",
    projectId: "fitness-app-56ba9",
    storageBucket: "fitness-app-56ba9.appspot.com",
    messagingSenderId: "629632761085"
  };
* */
