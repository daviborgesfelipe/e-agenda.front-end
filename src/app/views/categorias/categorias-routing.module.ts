import { NgModule, inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterModule, Routes } from '@angular/router';
import { InserirCategoriasComponent } from './inserir-categorias/inserir-categorias.component';
import { ListarCategoriasComponent } from './listar-categorias/listar-categorias.component';
import { ListarCategoriaViewModel } from './models/listar-categoria.view-model';
import { CategoriasService } from './services/categoria.service';
import { EditarCategoriasComponent } from './editar-categorias/editar-categorias.component';
import { FormsCategoriaViewModel } from './models/forms-categoria.view-model';
import { ExcluirCategoriasComponent } from './excluir-categorias/excluir-categorias.component';
import { VisualizarCategoriaViewModel } from './models/visualizar-categoria.view-model';

const listarCategoriasResolver: ResolveFn<ListarCategoriaViewModel[]> = () => {
  return inject(CategoriasService).selecionarTodos();
};

const formsCategoriasResolver: ResolveFn<FormsCategoriaViewModel> = (
  route: ActivatedRouteSnapshot
) => {
  return inject(CategoriasService).selecionarPorId(route.paramMap.get('id')!);
};

const visualizarCategoriaResolver: ResolveFn<VisualizarCategoriaViewModel> = (
  route: ActivatedRouteSnapshot
) => {
  return inject(CategoriasService).selecionarCategoriaCompletaPorId(
    route.paramMap.get('id')!
  );
};

const routes: Routes = [
  {
    path: '',
    redirectTo: 'listar',
    pathMatch: 'full',
  },
  {
    path: 'listar',
    component: ListarCategoriasComponent,
    resolve: { categorias: listarCategoriasResolver },
  },
  {
    path: 'inserir',
    component: InserirCategoriasComponent,
  },
  {
    path: 'editar/:id',
    component: EditarCategoriasComponent,
    resolve: { categoria: formsCategoriasResolver }
  },

  {
    path: 'excluir/:id',
    component: ExcluirCategoriasComponent,
    resolve: { categoria: visualizarCategoriaResolver },
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class CategoriasRoutingModule { }
