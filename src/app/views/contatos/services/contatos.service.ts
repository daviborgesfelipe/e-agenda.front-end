import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FormsContatoViewModel } from '../models/forms-contato.view-model';
import { ListarContatoViewModel } from '../models/listar-contato.view-model';

@Injectable()
export class ContatosService {
  private endpoints = `https://e-agenda-web-api.onrender.com/api/contatos/`
  
  constructor(private http: HttpClient) { }

  public inserir(contato: FormsContatoViewModel): Observable<FormsContatoViewModel>{
    return this.http.post<any>(this.endpoints, contato, this.obterAutorizacao())
  }

  public selecionarTodos(): Observable<ListarContatoViewModel[]> {
    return this.http
      .get<any>(this.endpoints, this.obterAutorizacao())
      .pipe(map((res) => res.dados));
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
}
