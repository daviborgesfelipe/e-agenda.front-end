import { NgModule, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterModule,
  Routes,
} from '@angular/router';
import { InserirContatosComponent } from './inserir-contatos/inserir-contatos.component';
import { EditarContatosComponent } from './editar-contatos/editar-contatos.component';
import { ExcluirContatosComponent } from './excluir-contatos/excluir-contatos.component';
import { ListarContatosComponent } from './listar-contatos/listar-contatos.component';
import { FormsContatoViewModel } from './models/forms-contato.view-model';
import { ListarContatoViewModel } from './models/listar-contato.view-model';
import { VisualizarContatoViewModel } from './models/visualizar-cotato.view-model';
import { ContatosService } from './services/contatos.service';

const listarContatosResolver: ResolveFn<ListarContatoViewModel[]> = () => {
  return inject(ContatosService).selecionarTodos();
};

const formsContatoResolver: ResolveFn<FormsContatoViewModel> = (
  route: ActivatedRouteSnapshot
) => {
  return inject(ContatosService).selecionarPorId(route.paramMap.get('id')!);
};

const visualizarContatoResolver: ResolveFn<VisualizarContatoViewModel> = (
  route: ActivatedRouteSnapshot
) => {
  return inject(ContatosService).selecionarContatoCompletoPorId(
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
    component: ListarContatosComponent,
    resolve: { contatos: listarContatosResolver },
  },
  {
    path: 'inserir',
    component: InserirContatosComponent,
  },
  {
    path: 'editar/:id',
    component: EditarContatosComponent,
    resolve: { contato: formsContatoResolver },
  },
  {
    path: 'excluir/:id',
    component: ExcluirContatosComponent,
    resolve: { contato: visualizarContatoResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContatosRoutingModule {}
