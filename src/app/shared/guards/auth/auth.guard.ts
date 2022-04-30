import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { UserService } from '../../../core/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private oidcSecurityService: OidcSecurityService,
    private userService: UserService,
    private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.userService.user && this.userService.user.sub === 'guess-user') {
      return true;
    }

    return this.oidcSecurityService.checkAuth().pipe(
      map(authResult => {
        // allow navigation if authenticated
        if (authResult.isAuthenticated) {
          return true;
        }

        // redirect if not authenticated
        return this.router.parseUrl('/login');
      })
    );
  }

}
