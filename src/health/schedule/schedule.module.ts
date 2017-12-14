import {NgModule} from '@angular/core';

import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../shared/shared.module";

// Components
import {ScheduleCalendarComponent} from "./components/schedule-calendar/schedule-calendar.component";
import {ScheduleControlsComponent} from "./components/schedule-controls/schedule-controls.component";
import {ScheduleDaysComponent} from "./components/schedule-days/schedule-days.component";
import {ScheduleSectionComponent} from "./components/schedule-section/schedule-section.component";

// Containers
import {ScheduleComponent} from './containers/schedule/schedule.component';

export const ROUTES: Routes = [
  { path: '', component: ScheduleComponent }
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
    ScheduleComponent,
    ScheduleCalendarComponent,
    ScheduleControlsComponent,
    ScheduleDaysComponent,
    ScheduleSectionComponent
  ],
})
export class ScheduleModule {
}
