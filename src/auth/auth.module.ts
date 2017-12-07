import {NgModule} from '@angular/core';

import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";
import {AngularFireModule, FirebaseAppConfig} from "angularfire2";
import {AngularFireAuthModule} from "angularfire2/auth";
import {AngularFireDatabaseModule} from "angularfire2/database";
import {SharedModule} from "./shared/shared.module";

export const ROUTES: Routes = [
  {
    path: 'auth',
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'login'},
      { path: 'login', loadChildren: './login/login.module#LoginModule'},
      { path: 'register', loadChildren: './register/register.module#RegisterModule'}
    ]
  }
];

export const FIREBASE_CONFIG: FirebaseAppConfig = {
  apiKey: "AIzaSyBbk43IosWkKrLBai4MtOAmMkeV2vTrM5I",
  authDomain: "fitness-app-56ba9.firebaseapp.com",
  databaseURL: "https://fitness-app-56ba9.firebaseio.com",
  projectId: "fitness-app-56ba9",
  storageBucket: "fitness-app-56ba9.appspot.com",
  messagingSenderId: "629632761085"
};

@NgModule({
  imports: [
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    CommonModule,
    RouterModule.forChild(ROUTES),
    SharedModule.forRoot()
  ],
  exports: [],
})
export class AuthModule {
}
