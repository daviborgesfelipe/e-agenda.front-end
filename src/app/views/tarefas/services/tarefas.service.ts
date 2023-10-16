import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormsTarefaViewModel } from "../models/forms-tarefas.view-models";
import { Observable, map } from "rxjs";
import { Form } from "@angular/forms";
import { environment } from "src/environments/environment";
import { ListarTarefaViewModel } from "../models/listar-tarefas.view-models";

@Injectable()

export class TarefasService {
  private endpoint: string =
    `https://e-agenda-web-api.onrender.com/api/tarefas/`

  constructor(private http: HttpClient) {}
  
  public inserir(tarefa: FormsTarefaViewModel): Observable<FormsTarefaViewModel> {
    return this.http
      .post<any>(this.endpoint, tarefa, this.obterAutorizacao())
      .pipe(map((res) => res.dados));
  }

  public selecionarTodos(): Observable<ListarTarefaViewModel[]> {
    return this.http
      .get<any>(this.endpoint, this.obterAutorizacao())
      .pipe(map((res) => res.dados));
  }

  private obterAutorizacao() {
    const token = environment.apiKey;

    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
  }
}