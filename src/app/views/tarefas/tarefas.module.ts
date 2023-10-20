import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InserirTarefasComponent } from './inserir-tarefas/inserir-tarefas.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DespesasRoutingModule } from '../despesas/despesas-routing.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { TarefasService } from './services/tarefas.service';
import { RouterModule } from '@angular/router';
import { TarefasRoutingModule } from './tarefas-routing.module';
import { ListarTarefasComponent } from './listar-tarefas/listar-tarefas.component';
import { EditarTarefasComponent } from './editar-tarefas/editar-tarefas.component';
import { ExcluirTarefasComponent } from './excluir-tarefas/excluir-tarefas.component';
import { CardTarefaComponent } from './card-tarefa/card-tarefa.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';


@NgModule({
  declarations: [
    InserirTarefasComponent,
    ListarTarefasComponent,
    EditarTarefasComponent,
    ExcluirTarefasComponent,
    CardTarefaComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TarefasRoutingModule,
    NgSelectModule, 
    NgbTooltipModule,
    RouterModule,  
    MatCardModule,  
    MatButtonModule, 
    MatDividerModule,
    MatProgressBarModule 
  ],
  providers: [
    TarefasService
  ]
})
export class TarefasModule { }
