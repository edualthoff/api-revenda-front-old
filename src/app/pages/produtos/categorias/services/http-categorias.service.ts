import { Observable } from 'rxjs';
import { API_URL } from './../../../../core/settings/config.settings';
import { CategoriasModal, CategoriasListResponse } from './categorias.modal';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpCategoriasService {

  constructor(private http: HttpClient) { }

  /**
   * Adiiconar uma nova Categoria
   */
  post(categorias: CategoriasModal) {
    return this.http.post<CategoriasModal>(`${API_URL}/categorias`, categorias);
  }

  delete(idCategoria: string) {
    //console.log("delete "+ (`${API_URL}/categorias/`+ encodeURIComponent(idCategoria)));
    return this.http.delete<CategoriasModal>(`${API_URL}/categorias/${idCategoria}`);
  }

  put(idCategoria: string, categorias: CategoriasModal){
    return this.http.put<CategoriasModal>(`${API_URL}/categorias/${idCategoria}`, categorias);
  }
  getTodosPage(pageNumber: number = 0, pageSize: number = 10) {
    const params = { page: pageNumber.toString(), size: pageSize.toString() };
    return this.http.get<CategoriasListResponse>(`${API_URL}/categorias/todos`, { params });
  }
  /**
   * Retorna uma categoria
   *
   * @param {string} idCategoira
   * @returns
   * @memberof HttpCategoriasService
   */
  get(idCategoira: string): Observable<CategoriasModal> {
    return this.http.get<CategoriasModal>(`${API_URL}/categorias/${idCategoira}`);
  }
}
