import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Store} from "store";
import {Observable} from "rxjs/Observable";
import {Meal} from "../meals/meals.service";
import {Workout} from "../workouts/workouts.service";
import "rxjs/add/operator/map";
import {AngularFireDatabase} from "angularfire2/database";
import {AuthService} from "../../../../auth/shared/services/auth/auth.service";
import "rxjs/add/operator/switchMap";
import {Subject} from "rxjs/Subject";
import "rxjs/add/operator/withLatestFrom";

export interface ScheduleItem {
  meals: Meal[];
  workouts: Workout[];
  section: string;
  timestamp: number;
  $key?: string;
}

export interface ScheduleList {
  morning?: ScheduleItem;
  lunch?: ScheduleItem;
  evening?: ScheduleItem;
  snacks?: ScheduleItem;
  [key: string]: any
}

@Injectable()
export class ScheduleService {

  private date$ = new BehaviorSubject(new Date());
  private section$ = new Subject();
  private itemList$ = new Subject();

  // Detect available items within a section and detect if a user is trying to update them
  items$ = this.itemList$
    .withLatestFrom(this.section$)
    .map(([ items, section ]: any[]) => {
      const id = section.data.$key;

      const defaults: ScheduleItem = {
        workouts: null,
        meals: null,
        section: section.section,
        timestamp: new Date(section.day).getTime()
      };

      // NOTE: Here we use a dynamic spread that checks if data exists in Firebase
      // If yes, return that db data, else return the defaults
      const payload = {
        ...(id ? section.data : defaults),
        ...items
      };

      if (id) {
        return this.updateSection(id, payload);
      } else {
        return this.createSection(payload);
      }
    });

  selected$ = this.section$
    .do((next: any) => this.store.set('selected', next));

  list$ = this.section$
    // First we map the current section that the user clicked to get that specific value from the Store
    .map((value: any) => this.store.value[value.type])
    .do((next: any) => this.store.set('list', next));

  schedule$: Observable<ScheduleItem[]> = this.date$
    .do((next: any) => {
      // Sets the selected date in our store...
      this.store.set('date', next);
    })
    .map((day:any) => {
      // Anytime date is updated we want to call back to Firebase to make a request between two timestamps - startAt & endAt
      // startAt - Stores the selected date in milliseconds
      const startAt = (
        new Date(day.getFullYear(), day.getMonth(), day.getDate())
      ).getTime();
      // endAt - Stores the next date after selected via `+1` and then uses `-1` on get time to prevent overlap in milliseconds
      const endAt = (
        new Date(day.getFullYear(), day.getMonth(), day.getDate() + 1)
      ).getTime() - 1;

      // Here we're returning the start / end times in milliseconds to get a very narrow range
      return { startAt, endAt };
    })
    .switchMap(({ startAt, endAt}: any) => {
      return this.getSchedule(startAt, endAt);
    })
    .map((data: any) => {
      // Once the Firebase response is received, we want to map out to our ScheduleList
      // Begin by instantiating a blank object
      const mapped: ScheduleList = {};

      // Next we loop through the entire response
      for (const prop of data) {
        // A bit of a hack here to allow us to *ngFor later...
        // Check if property has not been set
        if (!mapped[prop.section]) {
          mapped[prop.section] = prop;
        }
      }

      return mapped;
    })
    .do((next:any) => {
      // Once all the data is set and we have an array of Schedule items, we set that value within the Store
      this.store.set('schedule', next);
    });

  constructor(
    private authService: AuthService,
    private store: Store,
    private db: AngularFireDatabase
  ) {}

  get uid() {
    return this.authService.user.uid;
  }

  updateDate(date: Date) {
    this.date$.next(date);
  }

  updateItems(items: string[]) {
    this.itemList$.next(items);
  }

  selectSection(event: any) {
    // Here we are simply passing the user section that was selected into our Store
    this.section$.next(event);
  }

  private updateSection(key: string, payload: ScheduleItem) {
    this.db.object(`schedule/${this.uid}/${key}`).update(payload);
  }

  private createSection(payload: ScheduleItem) {
    return this.db.list(`/schedule/${this.uid}`).push(payload);
  }

  private getSchedule(startAt: number, endAt: number) {
    // Calls out to Firebase to return any schedule items from the current user between startAt and endAt timestamps
    return this.db.list(`schedule/${this.uid}`, {
      query: {
        orderByChild: 'timestamp',
        startAt,
        endAt
      }
    })
  }
}
