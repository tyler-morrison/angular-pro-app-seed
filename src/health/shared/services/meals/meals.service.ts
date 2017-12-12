import {Injectable} from '@angular/core';

import {Store} from "store";
import {AuthService} from "../../../../auth/shared/services/auth/auth.service";

// 3rd Party
import {AngularFireDatabase} from "angularfire2/database";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/do";

export interface Meal {
  name: string;
  ingredients: string[];
  timestamp: number;
  $key: string;
  $exists: () => boolean;
}

@Injectable()
export class MealsService {

  meals$: Observable<Meal[]> = this.db.list(`meals/${this.uid}`)
    .do(next => this.store.set('meals', next));

  constructor(
    private authService: AuthService,
    private db: AngularFireDatabase,
    private store: Store
  ) {}

  get uid() {
    return this.authService.user.uid;
  }

  addMeal(meal: Meal) {
    return this.db.list(`meals/${this.uid}`).push(meal);
  }
}
