import { RouterModule, Routes } from "@angular/router";
import { InserirTarefasComponent } from "./inserir-tarefas/inserir-tarefas.component";
import { NgModule, inject } from "@angular/core";
import { ListarTarefasComponent } from "./listar-tarefas/listar-tarefas.component";
import { TarefasService } from "./services/tarefas.service";

const listarTarefasResolver = () => {
  return inject(TarefasService).selecionarTodos();
};

const routes: Routes = [
  {
    path: '',
    redirectTo: 'listar',
    pathMatch: 'full',
  },
  {
    path: 'inserir',
    component: InserirTarefasComponent,
  },
  {
    path: 'listar',
    component: ListarTarefasComponent,
    resolve: { tarefas: listarTarefasResolver },
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TarefasRoutingModule {}