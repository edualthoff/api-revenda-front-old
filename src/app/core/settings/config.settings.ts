import { environment } from './../../../environments/environment';

export const ROUTING_APP = '';

export const API_URL = environment.serverUrl;

export const API_URL_AUTHENTIC = environment.serverAuthUtl;

export const API_URL_LOGIN_AUTHENTIC = environment.loginUrl;

export const ROTA_LOGIN = 'auth/login';

export const SESSION_NAME = 'session';

export enum ROTAS_REDIRECT {
    ROTA_LOGIN = 'auth/login',
    ROTA_MAIN = ''
}
