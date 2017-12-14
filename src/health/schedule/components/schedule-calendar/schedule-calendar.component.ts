import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {ScheduleItem, ScheduleList} from "../../../shared/services/schedule/schedule.service";

@Component({
  selector: 'schedule-calendar',
  styleUrls: ['schedule-calendar.component.scss'],
  template: `
    <div class="calendar">
      <schedule-controls
        [selected]="selectedDay"
        (move)="onChange($event)"
      >
      </schedule-controls>
      
      <schedule-days
        [selected]="selectedDayIndex"
        (select)="selectDay($event)"
      >
      </schedule-days>
      
      <schedule-section
        *ngFor="let section of sections"
        [name]="section.name"
        [section]="getSection(section.key)"
        (select)="selectSection($event, section.key)"
      >
        <!-- NOTE on (select): In addition to the event we pass out from ScheduleSection, we want to pass the specific key from our current iteration-->
      </schedule-section>
    </div>
  `
})

export class ScheduleCalendarComponent implements OnChanges {

  selectedDayIndex: Number;
  selectedDay: Date;
  selectedWeek: Date;

  sections = [
    { key: 'morning', name: 'Morning' },
    { key: 'lunch', name: 'Lunch' },
    { key: 'evening', name: 'Evening' },
    { key: 'Snacks', name: 'Snacks and Drinks' }
  ];

  @Input()
  set date(date: Date) {
    this.selectedDay = new Date(date.getTime());
  }

  @Input()
  items: ScheduleList;

  @Output()
  change = new EventEmitter<Date>();

  // This passes the select event up to ScheduleComponent one more time...
  @Output()
  select = new EventEmitter<any>();

  constructor() {}

  ngOnChanges(): void {
    this.selectedDayIndex = this.getToday(this.selectedDay);
    this.selectedWeek = this.getStartOfWeek(new Date(this.selectedDay));
  }

  getSection(name: string): ScheduleItem {
    // Here `this.items` relates to the entire ScheduleList
    // Then we dynamically use the `[name]` key to request a specific section related to the iteration in the *ngFor above
    return this.items && this.items[name] || {};
  }

  // NOTE: Here we can use a destructured syntax to get at the child properties of $event...
  selectSection({ type, assigned, data}: any, section: string) {
    const day = this.selectedDay;
    this.select.emit({
      type,
      assigned,
      section,
      day,
      data
    });
  }

  selectDay(index: number) {
    const selectedDay = new Date(this.selectedWeek);
    selectedDay.setDate(selectedDay.getDate() + index);
    this.change.emit(selectedDay);
  }

  onChange(weekOffset: number) {
    const startOfWeek = this.getStartOfWeek(new Date());
    const startDate = (
      new Date(startOfWeek.getFullYear(), startOfWeek.getMonth(), startOfWeek.getDate())
    );
    startDate.setDate(startDate.getDate() + (weekOffset * 7));
    this.change.emit(startDate);
  }

  private getToday(date: Date) {
    let today = date.getDay() - 1;

    if (today < 0) {
      today = 6;
    }

    return today;
  }

  private getStartOfWeek(date: Date) {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    return  new Date(date.setDate(diff));
  }
}
