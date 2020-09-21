import { API_URL_LOGIN_AUTHENTIC } from './../../core/settings/config.settings';
import { map } from 'rxjs/operators';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class HttpLoginService {

  private rotaUrl = 'oauth/user';
  private grant_type = 'password';

  constructor(private http: HttpClient) { }

  getLoginUsername(username: string, password: string) {
    var body2 = `grant_type=${this.grant_type}&username=${username}&password=${password}`;
    //let body = JSON.stringify({ username: username, password: password, grant_type: this.grant_type });
    return this.http.get(`${API_URL_LOGIN_AUTHENTIC}?`+body2)
      .pipe(map((response) => {
        let map = new Map(Object.entries(response));
        console.log("res "+ map.get('access_token'));
        return map.get('access_token');
      }));
  }
}
