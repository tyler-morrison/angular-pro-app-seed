import {NgModule} from '@angular/core';

import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";

// Containers
import {MealsComponent} from './containers/meals/meals.component';
import {MealComponent} from './containers/meal/meal.component';
import {SharedModule} from "../shared/shared.module";
import {MealFormComponent} from "./components/meal-form/meal-form.component";

export const ROUTES: Routes = [
  { path: '', component: MealsComponent },
  { path: 'new', component: MealComponent },
  { path: ':id', component: MealComponent }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES),
    SharedModule
  ],
  exports: [],
  declarations: [
    MealComponent,
    MealFormComponent,
    MealsComponent
  ],
})
export class MealsModule {
}
