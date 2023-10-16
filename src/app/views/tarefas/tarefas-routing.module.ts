import { ActivatedRouteSnapshot, ResolveFn, RouterModule, Routes } from "@angular/router";
import { NgModule, inject } from "@angular/core";

import { ListarTarefasComponent } from "./listar-tarefas/listar-tarefas.component";
import { InserirTarefasComponent } from "./inserir-tarefas/inserir-tarefas.component";
import { TarefasService } from "./services/tarefas.service";
import { ContatosService } from "../contatos/services/contatos.service";
import { VisualizarTarefasViewModel } from "./models/visualizar-tarefa.view-model";
import { EditarTarefasComponent } from "./editar-tarefas/editar-tarefas.component";
import { FormGroup } from "@angular/forms";
import { ExcluirTarefasComponent } from "./excluir-tarefas/excluir-tarefas.component";

const listarTarefasResolver = () => {
  return inject(TarefasService).selecionarTodos();
};

const formsTarefaResolver = (route: ActivatedRouteSnapshot) => {
  return inject(TarefasService).selecionarPorId(route.paramMap.get('id')!);
};

const visualizarTarefaResolver = (route: ActivatedRouteSnapshot) => {
  return inject(TarefasService).selecionarTarefaCompletaPorId(
    route.paramMap.get('id')!
  );
}

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
    resolve: { tarefa: formsTarefaResolver },
  },
  {
    path: 'excluir/:id',
    component: ExcluirTarefasComponent,
    resolve: { tarefa: visualizarTarefaResolver },
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TarefasRoutingModule {}