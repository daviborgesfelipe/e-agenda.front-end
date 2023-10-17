import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { CategoriasService } from '../services/categoria.service';
import { FormsCategoriaViewModel } from '../models/forms-categoria.view-model';

@Component({
  selector: 'app-inserir-categorias',
  templateUrl: './inserir-categorias.component.html',
  styleUrls: ['./inserir-categorias.component.css']
})
export class InserirCategoriasComponent implements OnInit{

  formulario!: FormGroup;
  categoriaViewModel!: FormsCategoriaViewModel;

  constructor(
    private formBuilder: FormBuilder,
    private categoriasService: CategoriasService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.formulario = this.formBuilder.group({
      titulo: new FormControl('', [Validators.required]),
    });

  }

  campoEstaInvalido(nome: string) {
    return this.formulario?.get(nome)!.touched && this.formulario?.get(nome)!.invalid;
  }

  gravar() {
    if (this.formulario.invalid) {
      for (let erro of this.formulario.validate()) {
        this.toastrService.warning(erro);
      }

      return;
    }

    this.categoriaViewModel = this.formulario.value

    this.categoriasService.inserir(this.formulario?.value).subscribe(
      {
        next: (categoria: FormsCategoriaViewModel) => this.processarSucesso(categoria),
        error: (erro: Error) => this.processarFalha(erro),
      }
    );
  }

  processarSucesso(categoria: FormsCategoriaViewModel) {
    this.toastrService.success(
      `A categoria "${categoria.titulo}" foi cadastrada com sucesso!`,
      'Sucesso'
    );

    this.router.navigate(['/categorias/listar']);
  }

  processarFalha(erro: Error) {
    this.toastrService.error(erro.message, 'Error');
  }
}

