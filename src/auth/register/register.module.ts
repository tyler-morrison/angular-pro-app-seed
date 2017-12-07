import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {RegisterComponent} from './containers/register.component';
import {CommonModule} from "@angular/common";
import {SharedModule} from "../shared/shared.module";

const ROUTES: Routes = [
  {path: '', component: RegisterComponent},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    SharedModule
  ],
  declarations: [ RegisterComponent ]
})
export class RegisterModule {
}
