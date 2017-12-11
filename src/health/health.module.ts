import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {AuthGuard} from "../auth/shared/guards/auth.guard";
import {SharedModule} from "./shared/shared.module";

export const ROUTES: Routes = [
  { path: 'meals', canActivate: [AuthGuard], loadChildren: './meals/meals.module#MealsModule'},
  { path: 'schedule', canActivate: [AuthGuard], loadChildren: './schedule/schedule.module#ScheduleModule'},
  { path: 'workouts', canActivate: [AuthGuard], loadChildren: './workouts/workouts.module#WorkoutsModule'}
];

@NgModule({
  imports: [
    SharedModule.forRoot(),
    RouterModule.forChild(ROUTES)
  ]
})
export class HealthModule {
}
