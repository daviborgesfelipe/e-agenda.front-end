import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { CompromissoService } from '../services/compromisso.service';
import { ContatosService } from '../../contatos/services/contatos.service';
import { FormsCompromissosViewModel } from '../models/form-compromissos.view-model';
import { ListarContatoViewModel } from '../../contatos/models/listar-contato.view-model';

@Component({
  selector: 'app-inserir-compromissos',
  templateUrl: './inserir-compromissos.component.html',
  styleUrls: ['./inserir-compromissos.component.css']
})
export class InserirCompromissosComponent implements OnInit{
  formulario?: FormGroup;

  compromissoFormViewModel?: FormsCompromissosViewModel;
  contatos: ListarContatoViewModel[] = []

  constructor(
    private formBuilder: FormBuilder,
    private compromissoService: CompromissoService,
    private contatoService: ContatosService,
    private toastService: ToastrService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      assunto: new FormControl('', [Validators.required, Validators.minLength(3)]),
      tipoLocal: new FormControl(0, [Validators.required]),
      link: new FormControl(''),
      local: new FormControl(''),
      data: new FormControl('19/11/2023', [Validators.required]),
      horaInicio: new FormControl('08:00', [Validators.required]),
      horaTermino: new FormControl('09:00', [Validators.required]),
      contatoId: new FormControl('')
    })
    this.contatoService
      .selecionarTodos()
      .subscribe(
        (contatoCadastrados) => (this.contatos = contatoCadastrados)
      )
  }

  gravar(){

    if(this.formulario?.invalid){
      for(let erro of this.formulario.validate()) {
        console.log(erro)
        this.toastService.warning(erro);
      }
      return
    }
    this.compromissoService.inserir(this.formulario?.value).subscribe({
        next: (compromisso: FormsCompromissosViewModel) => this.processarSucesso(compromisso),
        error: (erro: Error) => this.processarFalha(erro),
      }
    )
  }

  processarSucesso(compromisso: FormsCompromissosViewModel) {
    this.toastService.success(
      `O compromisso "${compromisso.assunto}" foi cadastrado com sucesso!`,
      'Sucesso'
    );

    this.router.navigate(['/compromissos/listar']);
  }

  processarFalha(erro: Error) {
    this.toastService.error(erro.message, 'Error');
  }
}
