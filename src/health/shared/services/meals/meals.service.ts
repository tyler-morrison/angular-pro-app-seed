import {Injectable} from '@angular/core';

import {Store} from "store";
import {AuthService} from "../../../../auth/shared/services/auth/auth.service";

// 3rd Party
import {AngularFireDatabase} from "angularfire2/database";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/do";
import "rxjs/add/observable/of";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/map";

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

  getMeal(key: string) {
    if (!key) {
      return Observable.of({});
    }
    return this.store.select<Meal[]>('meals')
      .filter(Boolean)
      .map(meals => meals.find((meal: Meal) => meal.$key === key));
  }

  addMeal(meal: Meal) {
    return this.db.list(`meals/${this.uid}`).push(meal);
  }

  updateMeal(key: string, meal: Meal) {
    return this.db.object(`meals/${this.uid}/${key}`).update(meal);
  }

  removeMeal(key: string) {
    return this.db.list(`meals/${this.uid}`).remove(key);
  }
}
