import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';

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
    ReactiveFormsModule,  
    MatCardModule,  
    MatButtonModule, 
    MatDividerModule,
    MatProgressBarModule 
  ],
  providers: [
    CategoriasService
  ],
})
export class CategoriasModule { }
