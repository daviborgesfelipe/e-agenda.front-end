import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoriasService } from '../services/categoria.service';

@Component({
  selector: 'app-inserir-categorias',
  templateUrl: './inserir-categorias.component.html',
  styleUrls: ['./inserir-categorias.component.css']
})
export class InserirCategoriasComponent implements OnInit{

  form?: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private categoriasService: CategoriasService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      titulo: new FormControl('', [Validators.required]),
    });

  }

  campoEstaInvalido(nome: string) {
    return this.form?.get(nome)!.touched && this.form?.get(nome)!.invalid;
  }

  gravar() {
    if (this.form?.invalid) {
      for (let erro of this.form.validate()) {
        this.toastrService.warning(erro);
      }

      return;
    }

    this.categoriasService.inserir(this.form?.value).subscribe((res) => {
      this.toastrService.success(
        `A categoria "${res.titulo}" foi cadastrada com sucesso!`,
        'Sucesso'
      );

      this.router.navigate(['/categorias/listar']);
    });
  }
}
