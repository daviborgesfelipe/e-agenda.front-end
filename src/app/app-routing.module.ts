import { NgModule, inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { InserirContatosComponent } from './views/contatos/inserir-contatos/inserir-contatos.component';
import { ListarContatosComponent } from './views/contatos/listar-contatos/listar-contatos.component';
import { EditarContatosComponent } from './views/contatos/editar-contatos/editar-contatos.component';
import { ExcluirContatosComponent } from './views/contatos/excluir-contatos/excluir-contatos.component';
import { FormsContatoViewModel } from './views/contatos/models/forms-contato.view-model';
import { ContatosService } from './views/contatos/services/contatos.service';

const formsContatoResolver: ResolveFn<FormsContatoViewModel> = (route: ActivatedRouteSnapshot) =>{
  return inject(ContatosService).selecionarPorId(route.paramMap.get('id')!)
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
  path: 'contatos/inserir', 
  component: InserirContatosComponent
 },
 {
  path: 'contatos/listar', 
  component: ListarContatosComponent
 },
 {
  path: 'contatos/editar/:id', 
  component: EditarContatosComponent,
  resolve: {
    contato: formsContatoResolver
  }
 },
 {
  path: 'contatos/excluir/:id', 
  component: ExcluirContatosComponent
 }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
