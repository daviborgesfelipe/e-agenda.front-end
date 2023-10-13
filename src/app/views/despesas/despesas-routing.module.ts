import { NgModule, inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterModule, Routes } from '@angular/router';
import { InserirDespesasComponent } from './inserir-despesas/inserir-despesas.component';
import { DespesasService } from './services/despesa.service';
import { ListarDespesasComponent } from './listar-despesas/listar-despesas.component';
import { EditarDespesasComponent } from './editar-despesas/editar-despesas.component';
import { ExcluirDespesasComponent } from './excluir-despesas/excluir-despesas.component';

const listarDespesasResolver = () => {
  return inject(DespesasService).selecionarTodos();
};

const formsDespesaResolver = (route: ActivatedRouteSnapshot) => {
  return inject(DespesasService).selecionarPorId(route.paramMap.get('id')!);
};

const visualizarDespesaResolver = (route: ActivatedRouteSnapshot) => {
  return inject(DespesasService).selecionarDespesaCompletaPorId(
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
    path: 'inserir',
    component: InserirDespesasComponent,
  },
  {
    path: 'listar',
    component: ListarDespesasComponent,
    resolve: { despesas: listarDespesasResolver },
  },
  {
    path: 'editar/:id',
    component: EditarDespesasComponent,
    resolve: { despesa: formsDespesaResolver },
  },
  {
    path: 'excluir/:id',
    component: ExcluirDespesasComponent,
    resolve: { despesa: visualizarDespesaResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DespesasRoutingModule {}