import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormsCompromissosViewModel } from '../models/form-compromissos.view-model';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ListarCompromissoViewModel } from '../models/listar-compromisso.view-model';

@Injectable()
export class CompromissoService {
  private endpoints = `https://e-agenda-web-api.onrender.com/api/compromissos/`
  constructor(private http: HttpClient) { }

  public inserir(compromisso: FormsCompromissosViewModel): Observable<FormsCompromissosViewModel> {
    return this.http
    .post<any>(
      this.endpoints,
      compromisso,
      this.obterAutorizacao()
    )
    .pipe(
      map((res) => res.dados),
      // Interceptar e tratar a mensagem de erro
      catchError((err: HttpErrorResponse) => this.processarErroHttp(err))
    );
  }

  public editar(
    id: string,
    compromisso: FormsCompromissosViewModel
  ): Observable<FormsCompromissosViewModel> {
    return this.http
      .put<any>(this.endpoints + id, compromisso, this.obterAutorizacao())
      .pipe(map((res) => res.dados));
  }

  public selecionarTodos(): Observable<ListarCompromissoViewModel[]> {
    return this.http
      .get<any>(this.endpoints, this.obterAutorizacao())
      .pipe(map((res) => res.dados));
  }

  public selecionarPorId(id: string): Observable<FormsCompromissosViewModel> {
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
