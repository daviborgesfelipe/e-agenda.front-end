import { NgModule, inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './views/dashboard/dashboard.component';
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

   //Categorias
 
 {
  path: 'categorias',
  loadChildren: () =>
    import('./views/categorias/categorias.module').then((m) => m.CategoriasModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
