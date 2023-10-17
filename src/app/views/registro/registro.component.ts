import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit{
  formulario?: FormGroup

  constructor(private formBuilder: FormBuilder){
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
    return this.formulario?.get(nome)!.touched && this.formulario?.get(nome)!.invalid;
  }

  gravar(){
    console.log(this.formulario?.value)
  }
}
