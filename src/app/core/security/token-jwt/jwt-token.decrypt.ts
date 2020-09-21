import { JwtUserToken } from './jwt-token.modal';

export interface JwtToken {

  access_toke: string;
  jwtUserToken: JwtUserToken;

}
/*******************
  * Metodo que separa as Claims publicas do token criptografadas em base64 e transformar em um JSON
  * @return JwtUserToken
*******************/
export class JwtTokenDecrypt {

  private jwtToken = { } as JwtToken;

  public getClaimsParseJwt(token: string): JwtUserToken {

    const base64 = token.split('.')[1];
    const base644 = base64.replace('-', '+').replace('_', '/');
    return this.jwtToken.jwtUserToken = JSON.parse(window.atob(base644));
  }
}
