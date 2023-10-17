import { Component, Input } from '@angular/core';
import { ListarTarefaViewModel } from '../models/listar-tarefas.view-models';

@Component({
  selector: 'app-card-tarefa',
  templateUrl: './card-tarefa.component.html',
  styleUrls: ['./card-tarefa.component.css']
})
export class CardTarefaComponent {
  @Input({ required: true }) tarefa!: ListarTarefaViewModel; 
}
