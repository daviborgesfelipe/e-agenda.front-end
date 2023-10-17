import { Observable, map } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { FormsDespesaViewModel } from '../models/forms-despesa.view-molde';
import { environment } from 'src/environments/environment';
import { ListarDespesaViewModel } from '../models/listar-despesa.view-model';
import { VisualizarDespesaViewModel } from '../models/visualizar-despesa.view-model';

@Injectable()
export class DespesasService {
  private endpoint: string =
    'https://e-agenda-web-api.onrender.com/api/despesas/';

  constructor(private http: HttpClient) {}

  public inserir(
    despesa: FormsDespesaViewModel
  ): Observable<FormsDespesaViewModel> {
    return this.http
      .post<any>(this.endpoint, despesa, this.obterHeadersAutorizacao())
      .pipe(map((res) => res.dados));
  }

  public excluir(id: string): Observable<any> {
    return this.http.delete<any>(
      this.endpoint + id,
      this.obterHeadersAutorizacao()
    );
  }

  public editar(
    id: string,
    despesa: FormsDespesaViewModel
  ): Observable<FormsDespesaViewModel> {
    return this.http
      .put<any>(this.endpoint + id, despesa, this.obterHeadersAutorizacao())
      .pipe(map((res) => res.dados));
  }

  public selecionarTodos(): Observable<ListarDespesaViewModel[]> {
    return this.http
      .get<any>(this.endpoint, this.obterHeadersAutorizacao())
      .pipe(map((res) => res.dados));
  }

  public selecionarPorId(id: string): Observable<FormsDespesaViewModel> {
    return this.http
      .get<any>(this.endpoint + id, this.obterHeadersAutorizacao())
      .pipe(map((res) => res.dados));
  }

  public selecionarDespesaCompletaPorId(
    id: string
  ): Observable<VisualizarDespesaViewModel> {
    return this.http
      .get<any>(
        this.endpoint + 'visualizacao-completa/' + id,
        this.obterHeadersAutorizacao()
      )
      .pipe(map((res) => res.dados));
  }

  private obterHeadersAutorizacao() {
    const token = environment.apiKey;

    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
  }
}