import { Component, OnInit } from '@angular/core';
import { ListarCompromissoViewModel } from '../models/listar-compromisso.view-model';
import { CompromissoService } from '../services/compromisso.service'


@Component({
  selector: 'app-listar-compromissos',
  templateUrl: './listar-compromissos.component.html',
  styleUrls: ['./listar-compromissos.component.css'],
})
export class ListarCompromissosComponent implements OnInit {
  compromissos: ListarCompromissoViewModel[] = [];

  constructor(private compromissoService: CompromissoService) {}

  ngOnInit(): void {
    this.compromissoService
      .selecionarTodos()
      .subscribe((compromissosCadastrados) => {
        this.compromissos = compromissosCadastrados;
      });
  }
}
