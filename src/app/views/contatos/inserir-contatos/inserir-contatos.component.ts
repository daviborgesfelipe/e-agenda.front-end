import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule } from '@angular/forms';
import { ContatosService } from '../services/contatos.service';
import { Router } from '@angular/router';
import { FormsContatoViewModel } from '../models/forms-contato.view-model';

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
    private router: Router  
  ){}

  ngOnInit(): void {

    this.formulario = this.formBuilder.group({
      nome: new FormControl(''),
      telefone: new FormControl(''),
      email: new FormControl(''),
      cargo: new FormControl(''),
      empresa: new FormControl(''),
    })
  }

  gravar(){
    this.contatoVM = this.formulario.value
    this.contatoService.inserir(this.formulario.value).subscribe((res) => {
      this.contatoVM = this.formulario.value;
      
      
      console.log(this.formulario.value)
      this.router.navigate(['/dashboard'])
    })
  }
}
