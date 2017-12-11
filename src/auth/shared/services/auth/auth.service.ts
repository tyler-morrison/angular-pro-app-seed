import {Injectable} from '@angular/core';
import {AngularFireAuth} from "angularfire2/auth";
import {Store} from "store";
import "rxjs/add/operator/do";

export interface User {
  email: string;
  uid: string;
  authenticated: boolean;
}

@Injectable()
export class AuthService {
  // Whenever there is a change in AF authState, the following side effects will be invoked
  auth$ = this.af.authState
    .do(next => {
      // On logout, remove existing user data from Store...
      if(!next) {
        this.store.set('user', null);
        // Once we have nulled the user, exit function...
        return;
      }

      // On login, set user property of Store...
      const user: User = {
        email: next.email,
        uid: next.uid,
        authenticated: true
      };
      this.store.set('user', user);
    });

  constructor(
    private af: AngularFireAuth,
    private store: Store
  ) {}

  get authState() {
    return this.af.authState;
  }

  get user() {
    return this.af.auth.currentUser;
  }

  createUser(email: string, password: string) {
    return this.af.auth
      .createUserWithEmailAndPassword(email, password);
  }

  loginUser(email: string, password: string) {
    return this.af.auth
      .signInWithEmailAndPassword(email, password);
  }

  logoutUser() {
    return this.af.auth.signOut();
  }
}
