import { RouterModule, Routes } from "@angular/router";
import { InserirTarefasComponent } from "./inserir-tarefas/inserir-tarefas.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'listar',
    pathMatch: 'full',
  },
  {
    path: 'inserir',
    component: InserirTarefasComponent,
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TarefasRoutingModule {}