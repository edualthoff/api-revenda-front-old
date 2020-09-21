import { ROTAS_REDIRECT } from './../../settings/config.settings';
import { AuthTokenStorageService } from './../auth-tokenstorage.service';
import { Injectable } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class LogedGuard implements CanActivateChild {

  constructor(private router: Router, private authToken: AuthTokenStorageService) { }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.authToken.isLoggedIn()) {
      return this.router.navigateByUrl(ROTAS_REDIRECT.ROTA_MAIN);
    }
    console.log("loggroute ",next['routeConfig']['path']);

    return true;
  }
}
