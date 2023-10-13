import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ContatosRoutingModule } from './../../contatos/contatos-routing.module';
import { Component, OnInit } from '@angular/core';
import { VisualizarCategoriaViewModel } from '../models/visualizar-categoria.view-model';
import { CategoriasService } from '../services/categoria.service';

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
    this.categoriasService.excluir(this.categoriaVM!.id).subscribe(() => {
      this.toastrService.success(
        `A categoria foi excluída com sucesso!`,
        'Sucesso'
      );

      this.router.navigate(['/categorias', 'listar']);
    });
  }
}