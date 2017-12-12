import {
  ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output,
  SimpleChanges
} from '@angular/core';
import {Meal} from "../../../shared/services/meals/meals.service";
import { FormArray, FormGroup, FormBuilder, FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'meal-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['meal-form.component.scss'],
  template: `
    <div class="meal-form">
      <form [formGroup]="form">
        <div class="meal-form__name">
          <label>
            <h3>Meal Name</h3>
            <input
              type="text"
              placeholder="e.g. English Breakfast"
              formControlName="name"
            >
            <div class="error" *ngIf="required">
              Workout name is required
            </div>
          </label>
        </div>
        <div class="meal-form__food">
          <div class="meal-form__subtitle">
            <h3>Food</h3>
            <button
              type="button"
              class="meal-form__add"
              (click)="addIngredient()"
            >
              <img src="/img/add-white.svg" alt="Add">
              Add Food
            </button>
          </div>
          <div
            formArrayName="ingredients"
          >
            <label *ngFor="let c of ingredients.controls; index as i;">
              <input [formControlName]="i" placeholder="eg. Eggs">
              <span
                class="meal-form__remove"
                (click)="removeIngredient(i)"
              ></span>
            </label>
          </div>
        </div>
        <div class="meal-form__submit">
          <div>
            <button
              type="button"
              class="button"
              *ngIf="!exists"
              (click)="createMeal()"
            >
              Create Meal
            </button>
            <button
              type="button"
              class="button"
              *ngIf="exists"
              (click)="updateMeal()"
            >
              Save
            </button>
            <a
              class="button button--cancel"
              [routerLink]="['../']"
            >
              Cancel
            </a>
          </div>
          
          <div class="meal-form__delete" *ngIf="exists">
            <div *ngIf="toggled">
              <p>Delete Item?</p>
              <button type="button" class="confirm" (click)="removeMeal()">Yes</button>
              <button type="button" class="cancel" (click)="toggle()">No</button>
            </div>

            <button type="button" class="button button--delete" (click)="toggle()">
              Delete
            </button>
          </div>
        </div>
      </form>
    </div>
  `
})

export class MealFormComponent implements OnChanges {
  @Input()
  meal: Meal;

  @Output()
  create = new EventEmitter<Meal>();

  @Output()
    update = new EventEmitter<Meal>();

  @Output()
    remove = new EventEmitter<Meal>();

  toggled: boolean = false;
  exists: boolean = false;

  form = this.fb.group({
    name: ['', Validators.required],
    ingredients: this.fb.array([''])
  });

  constructor(
    private fb: FormBuilder
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if(this.meal && this.meal.name) {
      this.exists = true;

      const value = this.meal;
      this.form.patchValue(value);

      // Quirk / bug of Angular requires us to loop through form controls since patchValue will not affect them as is...
      this.emptyIngredients();
      if (value.ingredients) {
        for (const item of value.ingredients) {
          this.ingredients.push(new FormControl(item));
        }
      }
    }
  }

  emptyIngredients() {
    while (this.ingredients.controls.length) {
      this.ingredients.removeAt(0);
    }
  }

  toggle() {
    this.toggled = !this.toggled;
  }

  get required() {
    return (
      this.form.get('name').hasError('required') &&
        this.form.get('name').touched
    );
  }

  get ingredients() {
    return this.form.get('ingredients') as FormArray;
  }

  createMeal() {
    if (this.form.valid) {
      this.create.emit(this.form.value);
    }
  }

  updateMeal() {
    if (this.form.valid) {
      this.update.emit(this.form.value);
    }
  }

  removeMeal() {
    this.remove.emit(this.form.value);
  }

  addIngredient() {
    this.ingredients.push(new FormControl(''));
  }

  removeIngredient(index: number) {
    this.ingredients.removeAt(index);
  }
}
