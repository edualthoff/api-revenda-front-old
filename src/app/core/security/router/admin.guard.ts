import { ROTAS_REDIRECT } from './../../settings/config.settings';
import { AuthTokenStorageService } from './../auth-tokenstorage.service';
import { ROLE_AUTHENTIC } from './../role.enum';
import { RoleActiveService } from './../role-active.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class AdminGuard implements CanActivateChild {

  constructor(private router: Router, private roleActive: RoleActiveService, private authToken: AuthTokenStorageService) { }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authToken.isLoggedIn()) {
      // Logged in ROLED USER so return true
      //console.log("AdminGuard rr" + this.roleActive.roleValidete(ROLE_AUTHENTIC.ROLE_ADMIN))
      return this.roleActive.roleValidete(ROLE_AUTHENTIC.ROLE_ADMIN);
    } else {
      // Not logged in so redirect to login page with the return url
      //console.log("eourw "+this.router.navigate([ROTA_LOGIN]))
      this.router.navigateByUrl(ROTAS_REDIRECT.ROTA_LOGIN);
      return true;
    }
  }
}
