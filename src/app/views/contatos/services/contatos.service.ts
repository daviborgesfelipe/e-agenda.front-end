import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';

import { environment } from 'src/environments/environment';
import { FormsContatoViewModel } from '../models/forms-contato.view-model';
import { ListarContatoViewModel } from '../models/listar-contato.view-model';
import { VisualizarContatoViewModel } from '../models/visualizar-cotato.view-model';

@Injectable()
export class ContatosService {
  private endpoints = `https://e-agenda-web-api.onrender.com/api/contatos/`
  
  constructor(private http: HttpClient) { }

  public inserir(contato: FormsContatoViewModel): Observable<FormsContatoViewModel>{
    return this.http
    .post<any>(
     this.endpoints,
     contato,
     this.obterAutorizacao()
    )
    .pipe(
      map((res) => res.dados),
      // Interceptar e tratar a mensagem de erro
      catchError((err: HttpErrorResponse) => this.processarErroHttp(err))
    );
  }

  public editar(id: string, contato: FormsContatoViewModel) {
    return this.http
      .put<any>(this.endpoints + id, contato, this.obterAutorizacao())
      .pipe(
        map((res) => res.dados),
        catchError((err: HttpErrorResponse) => {
          console.log(err)
          return this.processarErroHttp(err)
        })
      );
  }

  public excluir(id: string): Observable<any> {
    return this.http.delete(this.endpoints + id, this.obterAutorizacao())
    .pipe(
      map((res) => res),
      catchError((err: HttpErrorResponse) => {
        console.log(err)
        return this.processarErroHttp(err)
      })
    );;
  }

  public selecionarTodos(): Observable<ListarContatoViewModel[]> {
    return this.http
      .get<any>(this.endpoints, this.obterAutorizacao())
      .pipe(
        map((res) => res.dados),
        catchError((err: HttpErrorResponse) => {
          console.log(err)
          return this.processarErroHttp(err)
        })
      );
  }

  public selecionarPorId(id: string): Observable<FormsContatoViewModel> {
    return this.http
      .get<any>(this.endpoints + id, this.obterAutorizacao())
      .pipe(
        map((res) => res.dados),
        catchError((err: HttpErrorResponse) => {
          console.log(err)
          return this.processarErroHttp(err)
        })
      );
  }

  public selecionarContatoCompletoPorId(
    id: string
  ): Observable<VisualizarContatoViewModel> {
    return this.http
      .get<any>(
        this.endpoints + 'visualizacao-completa/' + id,
        this.obterAutorizacao()
      )
      .pipe(
        map((res) => res.dados),
        catchError((err: HttpErrorResponse) => {
          console.log(err)
          return this.processarErroHttp(err)
        })
      );
  }

  public obterAutorizacao(){
    const token = environment.apiKey;

    return{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      })
    }
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
