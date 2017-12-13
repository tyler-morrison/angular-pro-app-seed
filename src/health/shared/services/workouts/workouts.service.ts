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

export interface Workout {
  name: string;
  type: string;
  strength: any;
  endurance: any;
  timestamp: number;
  $key: string;
  $exists: () => boolean;
}

@Injectable()
export class WorkoutsService {

  workouts$: Observable<Workout[]> = this.db.list(`workouts/${this.uid}`)
    .do(next => this.store.set('workouts', next));

  constructor(
    private authService: AuthService,
    private db: AngularFireDatabase,
    private store: Store
  ) {}

  get uid() {
    return this.authService.user.uid;
  }

  getWorkout(key: string) {
    if (!key) {
      return Observable.of({});
    }
    return this.store.select<Workout[]>('workouts')
      .filter(Boolean)
      .map(workouts => workouts.find((workout: Workout) => workout.$key === key));
  }

  addWorkout(workout: Workout) {
    return this.db.list(`workouts/${this.uid}`).push(workout);
  }

  updateWorkout(key: string, workout: Workout) {
    return this.db.object(`workouts/${this.uid}/${key}`).update(workout);
  }

  removeWorkout(key: string) {
    return this.db.list(`workouts/${this.uid}`).remove(key);
  }
}
