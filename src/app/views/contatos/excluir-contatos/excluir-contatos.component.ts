import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private router: Router
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
    this.contatoService.excluir(this.idSelecionado!).subscribe((res) => {
      this.router.navigate(['/contatos', 'listar']);
    });
  }
}
