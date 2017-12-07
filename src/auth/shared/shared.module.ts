import {NgModule} from '@angular/core';

import {AuthFormComponent} from './components/auth-form/auth-form.component';
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    AuthFormComponent
  ],
  declarations: [
    AuthFormComponent
  ]
})
export class SharedModule {}
