import { API_URL } from './../../../../core/settings/config.settings';
import { LinksModal, LinksMlListResponse } from './links.modal';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpMlLinksService {

  private rotaUrl = 'links-mercadolivre';
  constructor(private http: HttpClient) { }

  /**
   * Adicionar um novo link
   * @param {LinksModal} linkModal
   * @returns
   * @memberof HttpMlLinksService
   */
  post(linkModal: LinksModal) {
    return this.http.post<LinksModal>(`${API_URL}/${this.rotaUrl}`, linkModal);
  }
  /**
   * Atualizar um link
   * @param {string} idLink
   * @param {LinksModal} linkModal
   * @returns
   * @memberof HttpMlLinksService
   */
  put(idLink: string, linkModal: LinksModal) {
    return this.http.put<LinksModal>(`${API_URL}/${this.rotaUrl}/${idLink}`, linkModal);
  }
  /**
   * Deletar um link
   * @param {string} idLinks
   * @returns
   * @memberof HttpMlLinksService
   */
  delete(idLinks: string) {
    return this.http.delete<LinksModal>(`${API_URL}/${this.rotaUrl}/${idLinks}`);
  }

  /** 
   * Buscar um link passando o ID como parametro
   * @param {string} idLinks
   * @returns
   * @memberof HttpMlLinksService
   */
  get(idLinks: string) {
    return this.http.get<LinksModal>(`${API_URL}/${this.rotaUrl}/${idLinks}`);
  }

  /**
   * Buscar Todos - Paginacao
   * @param {number} [pageNumber=0]
   * @param {number} [pageSize=10]
   * @returns
   * @memberof HttpMlLinksService
   */
  getTodosPage(pageNumber: number = 0, pageSize: number = 10) {
    const params = { page: pageNumber.toString(), size: pageSize.toString() };
    return this.http.get<LinksMlListResponse>(`${API_URL}/${this.rotaUrl}/todos`, { params });
  }

}
