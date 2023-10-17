import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { FormsContatoViewModel } from '../models/forms-contato.view-model';
import { ContatosService } from '../services/contatos.service';

@Component({
  selector: 'app-inserir-contatos',
  templateUrl: './inserir-contatos.component.html',
  styleUrls: ['./inserir-contatos.component.css']
})
export class InserirContatosComponent implements OnInit{

  formulario!: FormGroup
  contatoVM!: FormsContatoViewModel;

  constructor(
    private formBuilder: FormBuilder,
    private contatoService: ContatosService,
    private router: Router,
    private toastService: ToastrService  
  ){}

  ngOnInit(): void {

    this.formulario = this.formBuilder.group({
      nome: new FormControl('', [Validators.minLength(2), Validators.required]),
      telefone: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      cargo: new FormControl('', [Validators.minLength(2), Validators.required]),
      empresa: new FormControl('', [Validators.minLength(2), Validators.required]),
    })
  }

  campoEstaInvalido(nome: string) {
    return this.formulario.get(nome)!.touched && this.formulario.get(nome)!.invalid;
  }

  get email() {
    return this.formulario.get('email');
  }

  gravar(){
    if(this.formulario.invalid){
      for (let erro of this.formulario.validate()) {
        this.toastService.warning(erro);
      }

      return;
    }
    this.contatoVM = this.formulario.value

    this.contatoService.inserir(this.contatoVM).subscribe({
      next: (contato: FormsContatoViewModel) => this.processarSucesso(contato),
      error: (err: Error) => this.processarFalha(err),
    });
  }

  processarSucesso(contato: FormsContatoViewModel) {
    this.toastService.success(
      `O contato "${contato.nome}" foi cadastrado com sucesso!`,
      'Sucesso'
    );

    this.router.navigate(['/contatos/listar']);
  }

  processarFalha(erro: Error) {
    this.toastService.error(erro.message, 'Error');
  }
}
