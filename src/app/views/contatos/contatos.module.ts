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

import { ContatosRoutingModule } from './contatos-routing.module';

import 'src/app/extensions/form-group.extension'
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDividerModule} from '@angular/material/divider';

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
    NgbModule,
    ContatosRoutingModule,  
    MatCardModule,  
    MatButtonModule, 
    MatDividerModule,
    MatProgressBarModule 
  ],
  providers: [
    ContatosService,
  ]
})
export class ContatosModule { }
