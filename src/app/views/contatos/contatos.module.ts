import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InserirContatosComponent } from './inserir-contatos/inserir-contatos.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ContatosService } from './services/contatos.service';
import { RouterModule } from '@angular/router';
import { ListarContatosComponent } from './listar-contatos/listar-contatos.component';

@NgModule({
  declarations: [
    InserirContatosComponent,
    ListarContatosComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [
    ContatosService
  ]
})
export class ContatosModule { }
