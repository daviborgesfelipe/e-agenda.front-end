import { Component, OnInit } from '@angular/core';
import { ListarCompromissoViewModel } from '../models/listar-compromisso.view-model';
import { CompromissoService } from '../services/compromisso.service'
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';


@Component({
  selector: 'app-listar-compromissos',
  templateUrl: './listar-compromissos.component.html',
  styleUrls: ['./listar-compromissos.component.css'],
})
export class ListarCompromissosComponent implements OnInit {
  compromissos: ListarCompromissoViewModel[] = [];

  constructor(
    private toastService: ToastrService,
    private route: ActivatedRoute
    ) {}

  ngOnInit(): void {
    this.route.data.pipe(map((dados) => dados['compromissos'])).subscribe({
      next: (compromissos) => this.obterContatos(compromissos),
      error: (erro) => this.processarFalha(erro),
    });
  }

  obterContatos(compromissos: ListarCompromissoViewModel[]) {
    this.compromissos = compromissos;
  }

  processarFalha(erro: Error) {
    this.toastService.error(erro.message, 'Erro');
  }
}
