import { AuthTokenStorageService } from './../security/auth-tokenstorage.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AppInitService {

  constructor(private authTokenStorageService: AuthTokenStorageService) { }

  Init() {
    return new Promise<void>((resolve, reject) => {
      console.log("AppInitService.init() called "+this.authTokenStorageService.isLoggedIn());
      if (!this.authTokenStorageService.isLoggedIn()) {
        this.authTokenStorageService.loadTokenBD();
      }
      resolve();
    });
  }
}
