import { ActivatedRouteSnapshot, ResolveFn, RouterModule, Routes } from "@angular/router";
import { NgModule, inject } from "@angular/core";

import { ListarTarefasComponent } from "./listar-tarefas/listar-tarefas.component";
import { InserirTarefasComponent } from "./inserir-tarefas/inserir-tarefas.component";
import { TarefasService } from "./services/tarefas.service";
import { ContatosService } from "../contatos/services/contatos.service";
import { VisualizarTarefasViewModel } from "./models/visualizar-tarefa.voew-model";
import { EditarTarefasComponent } from "./editar-tarefas/editar-tarefas.component";
import { FormGroup } from "@angular/forms";

const listarTarefasResolver = () => {
  return inject(TarefasService).selecionarTodos();
};

const visualizarContatoResolver: ResolveFn<VisualizarTarefasViewModel> = (
  route: ActivatedRouteSnapshot
) => {
  return inject(TarefasService).selecionarPorId(
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
    component: InserirTarefasComponent,
  },
  {
    path: 'listar',
    component: ListarTarefasComponent,
    resolve: { tarefas: listarTarefasResolver },
  },
  {
    path: 'editar/:id',
    component: EditarTarefasComponent,
    resolve: { tarefa: visualizarContatoResolver },
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TarefasRoutingModule {}