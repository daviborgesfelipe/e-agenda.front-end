import { NgModule, inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { InserirContatosComponent } from './views/contatos/inserir-contatos/inserir-contatos.component';
import { ListarContatosComponent } from './views/contatos/listar-contatos/listar-contatos.component';
import { EditarContatosComponent } from './views/contatos/editar-contatos/editar-contatos.component';
import { ExcluirContatosComponent } from './views/contatos/excluir-contatos/excluir-contatos.component';
import { FormsContatoViewModel } from './views/contatos/models/forms-contato.view-model';
import { ContatosService } from './views/contatos/services/contatos.service';
import { VisualizarContatoViewModel } from './views/contatos/models/visualizar-cotato.view-model';
import { ListarContatoViewModel } from './views/contatos/models/listar-contato.view-model';
import { InserirCompromissosComponent } from './views/compromissos/inserir-compromissos/inserir-compromissos.component';
import { ListarCompromissosComponent } from './views/compromissos/listar-compromissos/listar-compromissos.component';
import { EditarCompromissosComponent } from './views/compromissos/editar-compromissos/editar-compromissos.component';
import { FormsCompromissosViewModel } from './views/compromissos/models/form-compromissos.view-model';
import { CompromissoService } from './views/compromissos/services/compromisso.service';

const formsCompromissoResolver: ResolveFn<FormsCompromissosViewModel> = (route: ActivatedRouteSnapshot) =>{
  return inject(CompromissoService).selecionarPorId(route.paramMap.get('id')!)
}

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },

//Contatos

  {
    path: 'contatos',
    loadChildren: () =>
      import('./views/contatos/contatos.module').then((m) => m.ContatosModule),
  },

 //Compromissos
 
 {
  path: 'compromissos',
  loadChildren: () =>
    import('./views/compromissos/compromissos.module').then((m) => m.CompromissosModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
