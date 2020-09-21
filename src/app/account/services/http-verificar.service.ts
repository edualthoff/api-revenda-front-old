import { API_URL_AUTHENTIC } from './../../core/settings/config.settings';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpVerificarService {

  private rotaUrl = 'oauth/user';

  constructor(private httpClient: HttpClient) { }

  postVerificar(codigo: string) {
    console.log("post "+codigo);
    return this.httpClient.post(`${API_URL_AUTHENTIC}/${this.rotaUrl}/verificar/${codigo}`, null);
  }

  postEnviarEmal(email: string) {
    return this.httpClient.post(`${API_URL_AUTHENTIC}/${this.rotaUrl}/enviar-email/${email}`, null);
  }

}
