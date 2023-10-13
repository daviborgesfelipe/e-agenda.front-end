import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriasRoutingModule } from './categorias-routing.module';
import { InserirCategoriasComponent } from './inserir-categorias/inserir-categorias.component';
import { ListarCategoriasComponent } from './listar-categorias/listar-categorias.component';
import { CategoriasService } from './services/categoria.service';
import { CardCategoriaComponent } from './card-categoria/card-categoria.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditarCategoriasComponent } from './editar-categorias/editar-categorias.component';
import { ExcluirCategoriasComponent } from './excluir-categorias/excluir-categorias.component';


@NgModule({
  declarations: [
    InserirCategoriasComponent,
    ListarCategoriasComponent,
    CardCategoriaComponent,
    EditarCategoriasComponent,
    ExcluirCategoriasComponent
  ],
  imports: [
    CommonModule,
    CategoriasRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    CategoriasService
  ],
})
export class CategoriasModule { }
