import { VisualizarItemTarefaViewModel } from "./visualizar-item-tarefa.view-model";

export type VisualizarTarefasViewModel = {
  id: string
  titulo: string;
  dataCriacao: Date;
  dataConclusao?: Date;

  qntdItens: number;
  percentualConcluido: number;

  prioridade: string;
  situacao: string;

  itens: VisualizarItemTarefaViewModel[];
}
