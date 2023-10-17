import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TokenViewModel } from 'src/app/core/auth/models/token.view-model';
import { AuthService } from 'src/app/core/auth/services/auth.service';

import 'src/app/extensions/form-group.extension'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formulario!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  campoEstaInvalido(nome: string) {
    return this.formulario!.get(nome)!.touched && this.formulario!.get(nome)!.invalid;
  }

  login() {
    if (this.formulario?.invalid) {
      const erros = this.formulario.validate();

      for (let erro of erros) this.toastrService.warning(erro);

      return;
    }

    this.authService.login(this.formulario?.value).subscribe({
      next: (res) => this.processarSucesso(res),
      error: (err) => this.processarFalha(err),
    });
  }

  processarSucesso(res: TokenViewModel) {
    this.toastrService.success(
      'Seja bem-vindo, ' + res.usuarioToken.nome + '!',
      'Sucesso'
    );

    this.router.navigate(['/dashboard']);
  }

  processarFalha(err: Error) {
    this.toastrService.error(err.message, 'Erro');
  }
}