import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

import { VisualizarContatoViewModel } from '../models/visualizar-cotato.view-model';
import { ContatosService } from '../services/contatos.service';

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
    this.route.data.pipe(map((dados) => dados['contato'])).subscribe({
      next: (contato) => this.obterContato(contato),
      error: (erro) => this.processarFalha(erro),
    });
  }

  gravar() {
    this.contatoService.excluir(this.contatoVM.id).subscribe({
      next: () => this.processarSucesso(),
      error: (erro) => this.processarFalha(erro),
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

  obterContato(contato: VisualizarContatoViewModel) {
    this.contatoVM = contato;
  }
}
