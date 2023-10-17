import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';

import { VisualizarCategoriaViewModel } from '../models/visualizar-categoria.view-model';
import { CategoriasService } from '../services/categoria.service';
import { FormsCategoriaViewModel } from '../models/forms-categoria.view-model';

@Component({
  selector: 'app-excluir-categoria',
  templateUrl: './excluir-categorias.component.html',
  styleUrls: ['./excluir-categorias.component.css'],
})
export class ExcluirCategoriasComponent implements OnInit {
  categoriaVM?: VisualizarCategoriaViewModel;

  constructor(
    private categoriasService: CategoriasService,
    private toastrService: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.categoriaVM = this.route.snapshot.data['categoria'];
  }

  gravar() {
    this.categoriasService.excluir(this.categoriaVM!.id).subscribe(
      {
        next: (categoria: FormsCategoriaViewModel) => this.processarSucesso(categoria),
        error: (erro: Error) => this.processarFalha(erro),
      }
    );
  }

  processarSucesso(categoria: FormsCategoriaViewModel) {
    this.toastrService.success(
      `A categoria foi excluida com sucesso!`,
      'Sucesso'
    );

    this.router.navigate(['/categorias/listar']);
  }

  processarFalha(erro: Error) {
    this.toastrService.error(erro.message, 'Error');
  }
}