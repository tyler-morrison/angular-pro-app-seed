import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "store";
import {AuthService, User} from "../../../auth/shared/services/auth/auth.service";
import {Observable} from "rxjs/Observable";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-root',
  styleUrls: ['app.component.scss'],
  template: `
    <div>
      <h1>{{ user$ | async | json }}</h1>
      <div class="wrapper">
        <router-outlet></router-outlet>
      </div>
    </div>
  `
})
export class AppComponent implements OnInit, OnDestroy{

  user$: Observable<User>;
  subscription: Subscription;

  constructor(
    private authService: AuthService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.subscription = this.authService.auth$.subscribe();
    this.user$ = this.store.select<User>('user');
  }

  // If app component ever gets destroyed, we want to have this just to be sure.
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
