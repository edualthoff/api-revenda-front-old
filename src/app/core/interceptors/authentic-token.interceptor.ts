import { AuthTokenStorageService } from './../security/auth-tokenstorage.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthenticTokenInterceptor implements HttpInterceptor {

  constructor(private _authTokenStorageService: AuthTokenStorageService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    //Authentication by setting header with token value
    if (this._authTokenStorageService.isLoggedIn()) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this._authTokenStorageService.getAuthToken()}`,
          tenantID: `123456`
        }
      });
    } else {
      request = request.clone({
        setHeaders: {
          Authorization: 'Basic ' + btoa(environment.clientId + ':' + environment.clientSecret)
        }
      });
    }
    return next.handle(request);
  }
}
