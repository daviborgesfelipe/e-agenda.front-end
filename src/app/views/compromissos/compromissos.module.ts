import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ContatosService } from '../contatos/services/contatos.service';
import { InserirCompromissosComponent } from './inserir-compromissos/inserir-compromissos.component';
import { CompromissoService } from './services/compromisso.service';
import { ListarCompromissosComponent } from './listar-compromissos/listar-compromissos.component';
import { EditarCompromissosComponent } from './editar-compromissos/editar-compromissos.component';

@NgModule({
  declarations: [
    InserirCompromissosComponent,
    ListarCompromissosComponent,
    EditarCompromissosComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    NgbModule
  ],
  providers: [
    ContatosService,
    CompromissoService
  ]
})
export class CompromissosModule { }
