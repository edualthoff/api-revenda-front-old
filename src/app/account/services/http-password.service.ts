import { API_URL_AUTHENTIC } from './../../core/settings/config.settings';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class HttpPasswordService {

  private rotaUrl = 'oauth/user';

  constructor(private httpClient: HttpClient) { }

  postEnviarPassword(password: string, codigo: string) {
    console.log("post "+password);
    return this.httpClient.post(`${API_URL_AUTHENTIC}/${this.rotaUrl}/senha?password=${password}&codigo=${codigo}`, null);
  }

  postEnviarEmal(email: string) {
    return this.httpClient.post(`${API_URL_AUTHENTIC}/${this.rotaUrl}/senha/${email}`, null);
  }

}
