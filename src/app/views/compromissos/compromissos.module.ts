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

import { CompromissosRoutingModule } from './compromissos-routing.module';
import { ContatosModule } from '../contatos/contatos.module';
import { ExcluirCompromissosComponent } from './excluir-compromissos/excluir-compromissos.component';
import { CardCompromissoComponent } from './card-compromisso/card-compromisso.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  declarations: [
    InserirCompromissosComponent,
    ListarCompromissosComponent,
    EditarCompromissosComponent,
    ExcluirCompromissosComponent,
    CardCompromissoComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    NgbModule,
    CompromissosRoutingModule,
    ContatosModule,  
    MatCardModule,  
    MatButtonModule, 
    MatDividerModule,
    MatProgressBarModule 
  ],
  providers: [
    ContatosService,
    CompromissoService
  ]
})
export class CompromissosModule { }
