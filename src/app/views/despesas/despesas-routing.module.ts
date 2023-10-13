import { NgModule, inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterModule, Routes } from '@angular/router';
import { InserirDespesasComponent } from './inserir-despesas/inserir-despesas.component';
import { DespesasService } from './services/despesa.service';
import { ListarCategoriaViewModel } from '../categorias/models/listar-categoria.view-model';
import { CategoriasService } from '../categorias/services/categoria.service';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'listar',
    pathMatch: 'full',
  },
  {
    path: 'inserir',
    component: InserirDespesasComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DespesasRoutingModule {}