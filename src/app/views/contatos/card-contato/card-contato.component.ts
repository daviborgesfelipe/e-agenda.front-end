import { Component, Input } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

import { ListarContatoViewModel } from '../models/listar-contato.view-model';

@Component({
  selector: 'app-card-contato',
  templateUrl: './card-contato.component.html',
  styleUrls: ['./card-contato.component.css']
})
export class CardContatoComponent {
  @Input({ required: true }) contato!: ListarContatoViewModel;
  tituloCard = `Contato`
}
