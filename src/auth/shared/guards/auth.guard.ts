import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from "../services/auth/auth.service";
import "rxjs/add/operator/map";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.authService.authState
      .map((user) => {
        if(!user) {
          this.router.navigate(['/auth/login'])
        }
        // Double bang `!!` casts the User object over into a boolean...
        return !!user;
      });
  }
}
