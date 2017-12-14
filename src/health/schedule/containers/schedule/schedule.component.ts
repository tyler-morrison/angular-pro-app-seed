import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {ScheduleItem, ScheduleService} from "../../../shared/services/schedule/schedule.service";
import {Store} from "store";
import {Subscription} from "rxjs/Subscription";
import {Meal, MealsService} from "../../../shared/services/meals/meals.service";
import {Workout, WorkoutsService} from "../../../shared/services/workouts/workouts.service";

@Component({
  selector: 'schedule',
  styleUrls: ['schedule.component.scss'],
  template: `
    <div class="schedule">
      
      <schedule-calendar
        [date]="date$ | async"
        [items]="schedule$ | async"
        (change)="changeDate($event)"
        (select)="changeSection($event)"
      ></schedule-calendar>
      
      <schedule-assign
        *ngIf="open"
        [section]="selected$ | async"
        [list]="list$ | async"
        (update)="assignItem($event)"
        (cancel)="closeAssign()"
      >
      </schedule-assign>
      
    </div>
  `
})

export class ScheduleComponent implements OnInit, OnDestroy {

  open: boolean = false;

  date$: Observable<Date>;
  list$: Observable<Meal[] | Workout[]>;
  schedule$: Observable<ScheduleItem[]>;
  selected$: Observable<any>;
  subscriptions: Subscription[] = [];

  constructor(
    private mealsService: MealsService,
    private scheduleService: ScheduleService,
    private store: Store,
    private workoutService: WorkoutsService
  ) {}

  ngOnInit(): void {
    this.date$ = this.store.select('date');
    this.list$ = this.store.select('list');
    this.schedule$ = this.store.select('schedule');
    this.selected$ = this.store.select('selected');

    // We use this property to neatly package all of our subscriptions
    this.subscriptions = [
      this.mealsService.meals$.subscribe(),
      this.scheduleService.items$.subscribe(),
      this.scheduleService.list$.subscribe(),
      this.scheduleService.schedule$.subscribe(),
      this.scheduleService.selected$.subscribe(),
      this.workoutService.workouts$.subscribe()
    ];
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }

  closeAssign() {
    this.open = false;
  }

  async assignItem(items: string[]) {
    this.scheduleService.updateItems(items);
    this.closeAssign();
  }

  changeDate(date: Date) {
    this.scheduleService.updateDate(date);
  }

  changeSection(event: any) {
    this.scheduleService.selectSection(event);
    // Open up the modal of ScheduleAssign component
    this.open = true;
  }
}
