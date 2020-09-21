import { MarcasModal, MarcasListResponse } from './marcas.model';
import { API_URL } from './../../../../core/settings/config.settings';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpMarcasService {

  private urlMarcas = 'marcas';

  constructor(private http: HttpClient) { }

  /**
   * Adiiconar uma nova Marca
   */
  post(marcasModel: MarcasModal) {
    return this.http.post<MarcasModal>(`${API_URL}/${this.urlMarcas}`, marcasModel);
  }

  delete(idMarcas: string) {
    //console.log("delete "+ (`${API_URL}/categorias/`+ encodeURIComponent(idMarcas)));
    return this.http.delete<MarcasModal>(`${API_URL}/${this.urlMarcas}/${idMarcas}`);
  }

  put(idMarcas: string, marcasModel: MarcasModal){
    return this.http.put<MarcasModal>(`${API_URL}/${this.urlMarcas}/${idMarcas}`, marcasModel);
  }
  getTodosPage(pageNumber: number = 0, pageSize: number = 10) {
    const params = { page: pageNumber.toString(), size: pageSize.toString() };
    return this.http.get<MarcasListResponse>(`${API_URL}/${this.urlMarcas}/todos`, { params });
  }

  get( idMarca: string) {
    console.log("service marca: ", idMarca)
    return this.http.get<MarcasModal>(`${API_URL}/${this.urlMarcas}/${idMarca}`);
  }
}
