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


@NgModule({
  declarations: [
    InserirTarefasComponent,
    ListarTarefasComponent,
    EditarTarefasComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TarefasRoutingModule,
    NgSelectModule, 
    NgbTooltipModule,
    RouterModule
  ],
  providers: [
    TarefasService
  ]
})
export class TarefasModule { }
