import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './views/dashboard/dashboard.component';

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

  //Categorias
 {
  path: 'categorias',
  loadChildren: () =>
    import('./views/categorias/categorias.module').then((m) => m.CategoriasModule),
  },

  //Despesas
 {
  path: 'despesas',
  loadChildren: () =>
    import('./views/despesas/despesas.module').then((m) => m.DespesasModule),
  },

 //Tarefas
 {
  path: 'tarefas',
  loadChildren: () =>
    import('./views/tarefas/tarefas.module').then((m) => m.TarefasModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
