import { ItemTarefaViewModel } from "./item-tarefa.view-model";
import { PrioridadeTarefaEnum } from "./prioridade-tarefa.enum";

export type VisualizarTarefasViewModel = {
  titulo: string;
  prioridade: PrioridadeTarefaEnum;
  itens: ItemTarefaViewModel[];
}
