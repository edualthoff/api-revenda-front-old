import { debounceTime } from 'rxjs/operators';
import { ReenviarEmailService } from './../../account/services/reenviar-email.service';
import { JwtTokenDecrypt } from './token-jwt/jwt-token.decrypt';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { LocalStorageService } from './../services/storage/local-storage.service';
import { SESSION_NAME, ROTAS_REDIRECT } from './../settings/config.settings';
import { Injectable } from '@angular/core';

/**
 * Responsavel por manipular os atributos de authenticação do Local Storage.
 * @param token
 * @param companyActive
*/
@Injectable({
  providedIn: 'root'
})
export class AuthTokenStorageService {

  private token: BehaviorSubject<string> = new BehaviorSubject(null);

  constructor(private _storageApp: LocalStorageService, private router: Router, private reenviarEmailService: ReenviarEmailService) { }

  private setTokenSession(token) {
    this._storageApp.set(SESSION_NAME, token) ? this.token.next(token) : '';
  }

  private getToken() {
    this.token.next(this._storageApp.get(SESSION_NAME));
  }

  /*******************
   * Remove os atributos token e a company active do local storage para que seja feito o logout no sistema
  ******************/
  logout() {
    this._storageApp.remove(SESSION_NAME);
    this.token.next(null);
    //this._storageApp.remove(SESSION_NAME);
    this.router.navigate([ROTAS_REDIRECT.ROTA_LOGIN]);
    //this.token.next(null);
  }

  /*******************
   * Adiciona o token no Local Storage
   * @param token
  ******************/
  public setAuthSessionToken(token) {
    //console.log("isAuthentic "+ token)
    this.validarToken(token) !== null ? this.setTokenSession(token) : null;
  }
  /*******************
   * Verifica se o token ja foi adicionado caso true o usuario está logado no sistema
  *******************/
  public isLoggedIn(): boolean {
    //console.log("Token login isLoggedIn "+ this.token.value);
    //return (this.getToken() !== null);
    return (this.token.value !== null);
  }

  public loadTokenBD() {
    this.getToken();
  }

  /*******************
   * Recupera o token do Local Storage
  ******************/
  public getAuthToken() {
    //console.log("Token login getAuthToken " + this.getToken());
    return this.token.value;
  }

  public getExpiration() {
    return null;
  }

  private validarToken(token: string): string | null {
    const jwtTokenDecrypt = new JwtTokenDecrypt();
    const jwtUserToken = jwtTokenDecrypt.getClaimsParseJwt(token);
    if (!jwtUserToken.verificado) {
      debounceTime(500);
      setTimeout(() => {
        this.reenviarEmailService.buttonEnviarEmail(jwtUserToken.user_name);
      }, 300);
      return null;
    }
    return token;
  }
}
