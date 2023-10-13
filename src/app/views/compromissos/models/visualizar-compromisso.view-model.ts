import { ListarContatoViewModel } from '../../contatos/models/listar-contato.view-model';
import { TipoLocalCompromissoEnum } from './tipo-local-compromisso.enum';

export class VisualizarCompromissoViewModel {
  id: string;
  assunto: string;
  tipoLocal: TipoLocalCompromissoEnum;
  link: string;
  local: string;

  data: Date;
  horaInicio: string;
  horaTermino: string;

  contato?: ListarContatoViewModel;

  constructor(
    id: string,
    assunto: string,
    tipolocal: TipoLocalCompromissoEnum,
    link: string,
    local: string,
    data: Date,
    horaInicio: string,
    horaTermino:string,
    contato?: ListarContatoViewModel
  ){
    this.id = id;
    this.assunto = assunto;
    this.tipoLocal = tipolocal;
    this.link = link
    this.local = local;
    this.data = data
    this.horaInicio = horaInicio
    this.horaTermino = horaTermino
    this.contato = contato
  }
};
