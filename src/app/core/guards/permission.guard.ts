import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthFacadeService } from 'src/app/pages/auth/auth.facade.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionGuard implements CanActivate {

  constructor(
    private authFacadeService: AuthFacadeService,
    private router: Router,
  ) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const permissions = route.data['permissions'] as string[];
    console.log(permissions)
    const userPermissions = this.authFacadeService.permissions;

    const hasPermission = userPermissions.some(permission => permissions.includes(permission));

    return hasPermission ? true : this.router.createUrlTree(['/'])
  }

}
