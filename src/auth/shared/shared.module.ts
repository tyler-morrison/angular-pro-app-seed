import {ModuleWithProviders, NgModule} from '@angular/core';

import {AuthFormComponent} from './components/auth-form/auth-form.component';
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {AuthService} from "./services/auth/auth.service";
import {AuthGuard} from "./guards/auth.guard";

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
export class SharedModule {
  // Use static forRoot to prevent duplicate instance of AuthService
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        AuthGuard,
        AuthService
      ]
    };
  }
}
