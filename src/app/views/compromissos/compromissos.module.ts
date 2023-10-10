import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ContatosService } from '../contatos/services/contatos.service';
import { InserirCompromissosComponent } from './inserir-compromissos/inserir-compromissos.component';

@NgModule({
  declarations: [
    InserirCompromissosComponent
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
export class CompromissosModule { }