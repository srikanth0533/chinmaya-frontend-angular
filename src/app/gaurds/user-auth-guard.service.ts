import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UserAuthGuardService {

  constructor(private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    var isLoggedIn = false;
    var userObj = JSON.parse(sessionStorage.getItem("userData"));
    if (userObj) {
      isLoggedIn = userObj.user.id ? true : false;
    } else {
      isLoggedIn = false;
    }
    if (isLoggedIn) {
      return true;
    } else {
      this.router.navigate(["/login"]);
      return false;
    }
  }
}

