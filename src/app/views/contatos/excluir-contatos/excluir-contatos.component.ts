import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VisualizarContatoViewModel } from '../models/visualizar-cotato.view-model';
import { ContatosService } from '../services/contatos.service';
import { ToastrService } from 'ngx-toastr';
import { FormsContatoViewModel } from '../models/forms-contato.view-model';

@Component({
  selector: 'app-excluir-contatos',
  templateUrl: './excluir-contatos.component.html',
  styleUrls: ['./excluir-contatos.component.css']
})
export class ExcluirContatosComponent {
  contatoVM: VisualizarContatoViewModel;
  idSelecionado: string | null = null;

  constructor(
    private contatoService: ContatosService,
    private route: ActivatedRoute,
    private router: Router,
    private toastService: ToastrService 
  ) {
    this.contatoVM = new VisualizarContatoViewModel('', '', '', '', '', '');
  }

  ngOnInit(): void {
    this.idSelecionado = this.route.snapshot.paramMap.get('id');

    if (!this.idSelecionado) return;

    this.contatoService
      .selecionarContatoCompletoPorId(this.idSelecionado)
      .subscribe((res) => {
        this.contatoVM = res;
      });
  }

  gravar() {
    this.contatoService.excluir(this.idSelecionado!)
    .subscribe({
      next: () => this.processarSucesso(),
      error: (err: Error) => this.processarFalha(err),
    });
  }

  processarSucesso() {
    this.toastService.success(
      `O contato foi excluido com sucesso!`,
      'Sucesso'
    );

    this.router.navigate(['/contatos/listar']);
  }

  processarFalha(erro: Error) {
    this.toastService.error(erro.message, 'Error');
  }
}
