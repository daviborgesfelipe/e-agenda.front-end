import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { TarefasService } from '../services/tarefas.service';
import { VisualizarTarefasViewModel } from '../models/visualizar-tarefa.view-model';
import { FormsTarefaViewModel } from '../models/forms-tarefas.view-models';

@Component({
  selector: 'app-excluir-tarefas',
  templateUrl: './excluir-tarefas.component.html',
  styleUrls: ['./excluir-tarefas.component.css']
})
export class ExcluirTarefasComponent implements OnInit{
  tarefaVM?: VisualizarTarefasViewModel;

  constructor(
    private tarefasService: TarefasService,
    private toastrService: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.tarefaVM = this.route.snapshot.data['tarefa'];
  }

  gravar() {
    this.tarefasService.excluir(this.tarefaVM!.id).subscribe({
      next: (tarefa: FormsTarefaViewModel) => this.processarSucesso(tarefa),
      error: (err: Error) => this.processarFalha(err),
    });
  }

  processarSucesso(tarefa: FormsTarefaViewModel) {
    this.toastrService.success(
      `A tarefa foi excluida com sucesso!`,
      'Sucesso'
    );

    this.router.navigate(['/tarefas/listar']);
  }

  processarFalha(erro: Error) {
    this.toastrService.error(erro.message, 'Error');
  }
}
