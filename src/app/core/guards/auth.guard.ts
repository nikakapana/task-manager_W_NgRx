import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot, CanActivate,

  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthFacadeService} from "../../pages/auth/auth.facade.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(
    private authFacadeService: AuthFacadeService,
    private router: Router
  ) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


  if (!this.authFacadeService.token) {
  this.router.navigate(['/auth'])
  return false
}
return true
}

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.authFacadeService.token) {
      this.router.navigate(['/auth'])
      return false
  }
    return true
  }

}
