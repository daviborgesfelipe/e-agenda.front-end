import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CategoriasModule } from '../categorias/categorias.module';
import { DespesasService } from './services/despesa.service';
import { InserirDespesasComponent } from './inserir-despesas/inserir-despesas.component';
import { DespesasRoutingModule } from './despesas-routing.module';

import 'src/app/extensions/form-group.extension';
import { NgSelectModule } from '@ng-select/ng-select';
import { ListarDespesasComponent } from './listar-despesas/listar-despesas.component';

@NgModule({
  declarations: [
    InserirDespesasComponent,
    ListarDespesasComponent
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
