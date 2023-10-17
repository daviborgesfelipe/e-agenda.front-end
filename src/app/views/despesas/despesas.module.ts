import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

import { CategoriasModule } from '../categorias/categorias.module';
import { DespesasRoutingModule } from './despesas-routing.module';
import { DespesasService } from './services/despesa.service';

import { CardDespesaComponent } from './card-despesa/card-despesa.component';
import { InserirDespesasComponent } from './inserir-despesas/inserir-despesas.component';
import { ListarDespesasComponent } from './listar-despesas/listar-despesas.component';
import { EditarDespesasComponent } from './editar-despesas/editar-despesas.component';
import { ExcluirDespesasComponent } from './excluir-despesas/excluir-despesas.component';
import 'src/app/extensions/form-group.extension';

@NgModule({
  declarations: [
    InserirDespesasComponent,
    ListarDespesasComponent,
    EditarDespesasComponent,
    ExcluirDespesasComponent,
    CardDespesaComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DespesasRoutingModule,
    NgSelectModule,
    CategoriasModule
  ],
  providers: [
    DespesasService,
  ]
})
export class DespesasModule { }
