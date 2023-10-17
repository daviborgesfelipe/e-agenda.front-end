import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { TokenViewModel } from 'src/app/core/auth/models/token.view-model';
import { AuthService } from 'src/app/core/auth/services/auth.service';

import 'src/app/extensions/form-group.extension'

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit{
  formulario?: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastrService: ToastrService,
    private router: Router
  ){
  }
  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      confirmarSenha: ['', [Validators.required, Validators.minLength(6)]]
    })
  }


  campoEstaInvalido(nome: string) {
    return this.formulario!.get(nome)!.touched && this.formulario!.get(nome)!.invalid;
  }

  gravar(){
    if (this.formulario?.invalid) {
      const erros = this.formulario.validate();

      for (let erro of erros) this.toastrService.warning(erro);

      return;
    }

    this.authService.registrar(this.formulario?.value).subscribe({
      next: (res) => this.processarSucesso(res),
      error: (err) => this.processarFalha(err),
    });
  }

  processarSucesso(usuario: TokenViewModel) {
    console.log(this.formulario?.value)
    console.log(usuario)

    this.toastrService.success(
      `O usuario "${usuario.usuarioToken.nome}" foi cadastrado com sucesso!`,
      'Sucesso'
    );

    this.router.navigate(['/dashboard']);
  }

  processarFalha(err: Error){
    this.toastrService.error(err.message, "Erro")
  }
}
