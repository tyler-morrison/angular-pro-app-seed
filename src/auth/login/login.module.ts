import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {LoginComponent} from './containers/login.component';
import {CommonModule} from "@angular/common";
import {SharedModule} from "../shared/shared.module";

const ROUTES: Routes = [
  {path: '', component: LoginComponent},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    SharedModule
  ],
  declarations: [ LoginComponent ]
})
export class LoginModule {
}
