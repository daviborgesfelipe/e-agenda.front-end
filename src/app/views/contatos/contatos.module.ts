import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InserirContatosComponent } from './inserir-contatos/inserir-contatos.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ContatosService } from './services/contatos.service';
import { RouterModule } from '@angular/router';
import { ListarContatosComponent } from './listar-contatos/listar-contatos.component';
import { EditarContatosComponent } from './editar-contatos/editar-contatos.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    InserirContatosComponent,
    ListarContatosComponent,
    EditarContatosComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    NgbModule
  ],
  providers: [
    ContatosService
  ]
})
export class ContatosModule { }
