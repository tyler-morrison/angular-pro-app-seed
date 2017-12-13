import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";

import {MealsService} from "./services/meals/meals.service";

// 3rd Party Modules
import {AngularFireDatabaseModule} from "angularfire2/database";
import {ListItemComponent} from "./components/list-item/list-item.component";
import {WorkoutsService} from "./services/workouts/workouts.service";


@NgModule({
  imports: [
    AngularFireDatabaseModule,
    CommonModule,
    RouterModule
  ],
  declarations: [
    ListItemComponent
  ],
  exports: [
    ListItemComponent
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        MealsService,
        WorkoutsService
      ]
    };
  }
}
