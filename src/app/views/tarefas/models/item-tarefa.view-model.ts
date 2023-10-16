import { StatusItemTarefa } from "./status-tarefa.enum";

export type ItemTarefaViewModel = {
  id?: string;
  titulo: string;
  status: StatusItemTarefa;
  concluido: boolean
}