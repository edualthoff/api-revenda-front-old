/************************************
 * Classes responsaveis por receber os atributos do Claims - JWT Token
***********************************/
/*export class JwtUserToken {

  private _exp: string;
  public get exp(): string {
    return this._exp;
  }
  public set exp(value: string) {
    this._exp = value;
  }

  private _user_name: string;
  public get user_name(): string {
    return this._user_name;
  }
  public set user_name(value: string) {
    this._user_name = value;
  }
  private _authorities = new Array<string>();
  public get authorities() {
    return this._authorities;
  }
  public set authorities(value) {
    this._authorities = value;
  }
  private _verificado: boolean;
  public get verificado(): boolean {
    return this._verificado;
  }
  public set verificado(value: boolean) {
    this._verificado = value;
  }
  private _session: string;
  public get session(): string {
    return this._session;
  }
  public set session(value: string) {
    this._session = value;
  }
  private _client_id: string;
  public get client_id(): string {
    return this._client_id;
  }
  public set client_id(value: string) {
    this._client_id = value;
  }
}*/

export class JwtUserToken {
  user_name: string;
  verificado: boolean;
  exp: string;
  authorities = new Array<string>();
  modulo = new Array<string>();
}

export class JwtAuthorities {

  private _authority: string;

  public get authority(): string {
    return this._authority;
  }
  public set authority(value: string) {
    this._authority = value;
  }
}
