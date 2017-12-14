import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Workout} from "../../../shared/services/workouts/workouts.service";
import {Meal} from "../../../shared/services/meals/meals.service";

@Component({
  selector: 'schedule-assign',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['schedule-assign.component.scss'],
  template: `
    <div class="schedule-assign">
      <div class="schedule-assign__modal">
        <div class="schedule-assign__title">
          <h1>
            <img src="/img/{{ section.type === 'workouts' ? 'workout' : 'food' }}.svg">
            Assign {{ section.type }}
          </h1>
          <a
            class="btn__add"
            [routerLink]="getRoute(section.type)"
          >
            <img src="/img/add-white.svg" alt="Add">
            New {{ section.type }}
          </a>
        </div>
        <div class="schedule-assign__list">
        <span
          class="schedule-assign__empty"
          *ngIf="!list?.length"
        >
          <img src="/img/face.svg" alt="">
          Nothing here to assign
        </span>
        <div
          *ngFor="let item of list"
          [class.active]="exists(item.name)"
          (click)="toggleItem(item.name)"
        >
          {{ item.name }}
        </div>
        </div>
        <div class="schedule-assign__submit">
          <div>
            <button
              type="button"
              class="button"
              (click)="updateAssign()"
            >
              Update
            </button>
            <button
              type="button"
              class="button button--cancel"
              (click)="cancelAssign()"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  `
})

export class ScheduleAssignComponent implements OnInit {

  private selected: string[] = [];

  @Input()
  section: any;

  @Input()
  list: Meal[] | Workout[];

  @Output()
  update = new EventEmitter<any>();

  @Output()
  cancel = new EventEmitter<any>();

  ngOnInit(): void {
    // First get any assigned values for a selected section...
    this.selected = [...this.section.assigned];
  }

  getRoute(name: string) {
    // Passes in a dynamic route
    return [`../${name}/new`]
  }

  exists(name: string) {
    // NOTE: `!!` (i.e. double bang) converts to boolean
    // NOTE `~` (i.e. bitwise NOT operator) converts index number returned into a binary representation
    // End result is that if the value does NOT exist in array, bitwise operator will return a 0 that gets cast via double bang into 'false'
    return !!~this.selected.indexOf(name);
  }

  toggleItem(name: string) {
    if (this.exists(name)) {
      // NOTE: The immutable methods below...
      // If the value already exists, we want to return a new array to essentially remove the item
      this.selected = this.selected.filter(item => item !== name);
    } else {
      // Else, we add the item to our selected array
      this.selected = [...this.selected, name]
    }
  }

  updateAssign() {
    this.update.emit({
      // Dynamically assign to either 'meals' or 'workouts' with an array of values the user wants to assign
      [this.section.type]: this.selected
    });
  }

  cancelAssign() {
    this.cancel.emit();
  }
}
