import { Component } from '@angular/core';
import { VisualizarCompromissoViewModel } from '../models/visualizar-compromisso.view-model';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CompromissoService } from '../services/compromisso.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-excluir-compromissos',
  templateUrl: './excluir-compromissos.component.html',
  styleUrls: ['./excluir-compromissos.component.css']
})
export class ExcluirCompromissosComponent {
  compromisso?: VisualizarCompromissoViewModel;

  constructor(
    private compromissosService: CompromissoService,
    private toastrService: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.compromisso = new VisualizarCompromissoViewModel('', '', 0, '', '', new Date() , "08:00", "09:00")
  }

  ngOnInit(): void {
    this.route.data.pipe(map((dados) => dados['compromisso'])).subscribe({
      next: (contato) => this.obterContato(contato),
      error: (erro) => this.processarFalha(erro),
    });
  }

  obterContato(contato: VisualizarCompromissoViewModel) {
    this.compromisso = contato;
  }

  processarSucesso() {
    this.toastrService.success(
      `O compromisso foi excluído com sucesso!`,
      'Sucesso'
    );

    this.router.navigate(['/compromissos', 'listar']);
  }

  processarFalha(erro: Error) {
    this.toastrService.error(erro.message, 'Erro');
  }

  gravar() {
    this.compromissosService.excluir(this.compromisso!.id).subscribe({
      next: () => this.processarSucesso(),
      error: (erro) => this.processarFalha(erro),
    });

    this.router.navigate(['/compromissos', 'listar']);
  };
  
}
