import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ContatosService } from './services/contatos.service';
import { InserirContatosComponent } from './inserir-contatos/inserir-contatos.component';
import { ListarContatosComponent } from './listar-contatos/listar-contatos.component';
import { EditarContatosComponent } from './editar-contatos/editar-contatos.component';
import { ExcluirContatosComponent } from './excluir-contatos/excluir-contatos.component';
import { CardContatoComponent } from './card-contato/card-contato.component';

@NgModule({
  declarations: [
    InserirContatosComponent,
    ListarContatosComponent,
    EditarContatosComponent,
    ExcluirContatosComponent,
    CardContatoComponent
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
