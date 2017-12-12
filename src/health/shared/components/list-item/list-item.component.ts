import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'list-item',
  styleUrls: ['list-item.component.scss'],
  template: `
    <div class="list-item">
      {{ item | json }}
    </div>
  `
})

export class ListItemComponent implements OnInit {
  @Input()
  item: any;

  constructor() {
  }

  ngOnInit() {
  }
}
