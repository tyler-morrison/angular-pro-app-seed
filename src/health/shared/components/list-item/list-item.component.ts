import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'list-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['list-item.component.scss'],
  template: `
    <div class="list-item">
      <a [routerLink]="getRoute(item)">
        <p class="list-item__name">{{ item.name }}</p>
        <p class="list-item__ingredients">
          <span
            *ngIf="item.ingredients; else showWorkout"
          >
            {{ item.ingredients | join }}
          </span>
          <ng-template #showWorkout>
            <span>{{ item | workout }}</span>
          </ng-template>
        </p>
      </a>
      <div
        class="list-item__delete"
        *ngIf="toggled"
      >
        <p>Delete Item?</p>
        <button
          type="button"
          class="confirm"
          (click)="removeItem()"
        >
          Yes
        </button>
        <button
          type="button"
          class="cancel"
          (click)="toggle()"
        >
          No
        </button>
      </div>
      
      <button
        type="button"
        class="trash"
        (click)="toggle()"
      >
        <img src="/img/remove.svg" alt="">
      </button>
    </div>
  `
})

export class ListItemComponent {
  @Input()
  item: any;

  @Output()
  remove = new EventEmitter();

  toggled: boolean = false;

  constructor() {
  }

  toggle() {
    this.toggled = !this.toggled;
  }

  removeItem() {
    this.remove.emit(this.item);
  }

  getRoute(item: any) {
    return [
      `../${ item.ingredients ? 'meals' : 'workouts'}/`,
      item.$key
    ];
  }
}
