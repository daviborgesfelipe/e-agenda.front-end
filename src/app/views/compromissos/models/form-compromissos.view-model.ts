import { TipoLocalCompromissoEnum } from "./tipo-local-compromisso.enum";

export type FormsCompromissosViewModel = {
  assunto: string;
  tipoLocal: TipoLocalCompromissoEnum;
  link: string;
  local: string;

  data: Date;
  horaInicio: string;
  horaTeminino: string
  
  contatoId: string;
}
