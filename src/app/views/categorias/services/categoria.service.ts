import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';

import { FormsCategoriaViewModel } from '../models/forms-categoria.view-model';
import { ListarCategoriaViewModel } from '../models/listar-categoria.view-model';
import { VisualizarCategoriaViewModel } from '../models/visualizar-categoria.view-model';
import { LocalStorageService } from 'src/app/core/auth/services/local-storage.service';

@Injectable()
export class CategoriasService {
  private endpoint: string =
    'https://e-agenda-web-api.onrender.com/api/categorias/';

  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) {}

  public inserir(
    categoria: FormsCategoriaViewModel
  ): Observable<FormsCategoriaViewModel> {
    return this.http
      .post<any>(this.endpoint, categoria)
      .pipe(
        map((res) => res.dados),
        catchError((err: HttpErrorResponse) => this.processarErroHttp(err))
      );
  }

  public editar(
    id: string,
    categoria: FormsCategoriaViewModel
  ): Observable<FormsCategoriaViewModel> {
    return this.http
      .put<any>(this.endpoint + id, categoria)
      .pipe(
        map((res) => res.dados),
        catchError((err: HttpErrorResponse) => this.processarErroHttp(err))
      );
  }

  public excluir(id: string): Observable<any> {
    return this.http.delete<any>(
      this.endpoint + id)
      .pipe(
        map((res) => res.dados),
        catchError((err: HttpErrorResponse) => this.processarErroHttp(err))
      );
  }

  public selecionarPorId(id: string): Observable<FormsCategoriaViewModel> {
    return this.http
      .get<any>(this.endpoint + id)
      .pipe(
        map((res) => res.dados),
        catchError((err: HttpErrorResponse) => this.processarErroHttp(err))
      );
  }

  public selecionarTodos(): Observable<ListarCategoriaViewModel[]> {
    return this.http
      .get<any>(this.endpoint)
      .pipe(
        map((res) => res.dados),
        catchError((err: HttpErrorResponse) => this.processarErroHttp(err))
      );
  }

  public selecionarCategoriaCompletaPorId(
    id: string
  ): Observable<VisualizarCategoriaViewModel> {
    return this.http
      .get<any>(this.endpoint + 'visualizacao-completa/' + id)
      .pipe(
        map((res) => res.dados),
        catchError((err: HttpErrorResponse) => this.processarErroHttp(err))
      );
  }

  private obterAutorizacao() {
    const token = this.localStorage.obterDadosLocaisSalvos()?.chave;

    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
  }
  private processarErroHttp(erro: HttpErrorResponse) {
    let mensagemErro = '';

    if (erro.status == 0)
      mensagemErro = 'Ocorreu um erro ao processar a requisição.';
    if (erro.status == 401)
      mensagemErro =
        'O usuário não está autorizado. Efetue login e tente novamente.';
    else mensagemErro = erro.error?.erros[0];

    console.log(erro.error?.erros[0])

    return throwError(() => new Error(mensagemErro));
  }
}