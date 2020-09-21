import { UsuarioModal } from './cadastro.modal';
import { API_URL_AUTHENTIC } from './../../core/settings/config.settings';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class HttpCadastroService {

  private rotaUrl = 'oauth/user';

  constructor(private http: HttpClient) { }

  postCadastroComCodigo(cadastroModal: UsuarioModal, codigoCadastro: string): Observable<UsuarioModal> {
    return this.http.post<UsuarioModal>(`${API_URL_AUTHENTIC}/${this.rotaUrl}?codigo_cadastro=${codigoCadastro}`, cadastroModal);
  }
}
