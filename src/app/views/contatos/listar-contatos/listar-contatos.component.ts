import { Component } from '@angular/core';
import { ListarContatoViewModel } from '../models/listar-contato.view-model';
import { ContatosService } from '../services/contatos.service';

@Component({
  selector: 'app-listar-contatos',
  templateUrl: './listar-contatos.component.html',
  styleUrls: ['./listar-contatos.component.css']
})
export class ListarContatosComponent {
  
  contatos: ListarContatoViewModel[] = [];

  constructor(private contatosService: ContatosService) {
  }

  ngOnInit(): void {
    this.contatosService.selecionarTodos()
    .subscribe((_contatos) => {
      this.contatos = _contatos;
    });
  }
}
