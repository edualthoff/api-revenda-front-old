import { ItensListResponse, ItensModal } from './itens.modal';
import { API_URL } from './../../../../core/settings/config.settings';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpItensService {

  private rotaUrl = 'itens';

  constructor(private http: HttpClient) { }

  /**
 * Adiiconar uma novo Itens
 */
  post(itensModel: ItensModal) {
    return this.http.post<ItensModal>(`${API_URL}/${this.rotaUrl}`, itensModel);
  }

  delete(idItens: string) {
    //console.log("delete "+ (`${API_URL}/categorias/`+ encodeURIComponent(idMarcas)));
    return this.http.delete<ItensModal>(`${API_URL}/${this.rotaUrl}/${idItens}`);
  }

  put(idItens: string, itensModel: ItensModal) {
    return this.http.put<ItensModal>(`${API_URL}/${this.rotaUrl}/${idItens}`, itensModel);
  }

  getTodosPage(pageNumber: number = 0, pageSize: number = 10) {
    const params = { page: pageNumber.toString(), size: pageSize.toString() };
    return this.http.get<ItensListResponse>(`${API_URL}/${this.rotaUrl}/todos`, { params });
  }

  /**
   * Buscar itens por modelo retornando uma pagina @param ItensListResponse 
   * Auto Complete - paginacao
   *
   * @param {number} [pageNumber=0]
   * @param {number} [pageSize=10]
   * @param {string} modelo
   * @returns 
   * @memberof HttpItensService
   */
  getTodosPagePorModelo(pageNumber: number = 0, pageSize: number = 10, modelo: string): Observable<ItensListResponse> {
    const params = { page: pageNumber.toString(), size: pageSize.toString(), modelo: modelo };
    return this.http.get<ItensListResponse>(`${API_URL}/${this.rotaUrl}/modelo`, { params }).pipe(
      retry(1)
    );
  }

  get(idItens: string) {
    return this.http.get<ItensModal>(`${API_URL}/${this.rotaUrl}/${idItens}`);
  }

}
