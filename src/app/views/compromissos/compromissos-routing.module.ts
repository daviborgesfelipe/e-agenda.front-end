import { NgModule, inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterModule, Routes } from '@angular/router';

import { CompromissoService } from './services/compromisso.service';
import { InserirCompromissosComponent } from './inserir-compromissos/inserir-compromissos.component';
import { ListarCompromissosComponent } from './listar-compromissos/listar-compromissos.component';
import { EditarCompromissosComponent } from './editar-compromissos/editar-compromissos.component';
import { FormsCompromissosViewModel } from './models/form-compromissos.view-model';
import { ListarCompromissoViewModel } from './models/listar-compromisso.view-model';
import { VisualizarCompromissoViewModel } from './models/visualizar-compromisso.view-model';
import { ExcluirCompromissosComponent } from './excluir-compromissos/excluir-compromissos.component';

const formsCompromissoResolver: ResolveFn<FormsCompromissosViewModel> = (
  route: ActivatedRouteSnapshot
) => {
  return inject(CompromissoService).selecionarPorId(route.paramMap.get('id')!);
};

const listarCompromissosResolver: ResolveFn<ListarCompromissoViewModel[]> = () => {
  return inject(CompromissoService).selecionarTodos();
};

const visualizarCompromissosResolver: ResolveFn<VisualizarCompromissoViewModel> = (
  route: ActivatedRouteSnapshot
) => {
  return inject(CompromissoService).selecionarCompromissoCompletoPorId(
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
    component: ListarCompromissosComponent,
    resolve: { compromissos: listarCompromissosResolver }
  },

  {
    path: 'inserir',
    component: InserirCompromissosComponent,
  },

  {
    path: 'editar/:id',
    component: EditarCompromissosComponent,
    resolve: { compromisso: formsCompromissoResolver },
  },

  {
    path: 'excluir/:id',
    component: ExcluirCompromissosComponent,
    resolve: { compromisso: visualizarCompromissosResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompromissosRoutingModule {}
