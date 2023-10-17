import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CategoriasRoutingModule } from './categorias-routing.module';
import { CardCategoriaComponent } from './card-categoria/card-categoria.component';
import { CategoriasService } from './services/categoria.service';
import { InserirCategoriasComponent } from './inserir-categorias/inserir-categorias.component';
import { ListarCategoriasComponent } from './listar-categorias/listar-categorias.component';
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
