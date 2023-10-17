import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { CategoriasService } from '../services/categoria.service';
import { FormsCategoriaViewModel } from '../models/forms-categoria.view-model';

import '/src/app/extensions/form-group.extension'

@Component({
  selector: 'app-editar-categoria',
  templateUrl: './editar-categorias.component.html',
  styleUrls: ['./editar-categorias.component.css'],
})
export class EditarCategoriasComponent {
  form?: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private categoriasService: CategoriasService,
    private toastrService: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      titulo: new FormControl('', [Validators.required]),
    });

    this.form.patchValue(this.route.snapshot.data['categoria']);
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

    const id = this.route.snapshot.paramMap.get('id')!;

    this.categoriasService.editar(id, this.form?.value).subscribe(
      {
        next: (categoria: FormsCategoriaViewModel) => this.processarSucesso(categoria),
        error: (erro: Error) => this.processarFalha(erro),
      }
    );
  }

  processarSucesso(categoria: FormsCategoriaViewModel) {
    this.toastrService.success(
      `A categoria "${categoria.titulo}" foi editada com sucesso!`,
      'Sucesso'
    );

    this.router.navigate(['/categorias/listar']);
  }

  processarFalha(erro: Error) {
    this.toastrService.error(erro.message, 'Error');
  }
}
