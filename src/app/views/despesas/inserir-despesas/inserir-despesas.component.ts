import { Component, OnInit } from '@angular/core';
import { ListarCategoriaViewModel } from '../../categorias/models/listar-categoria.view-model';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoriasService } from '../../categorias/services/categoria.service';
import { DespesasService } from '../services/despesa.service';

@Component({
  selector: 'app-inserir-despesas',
  templateUrl: './inserir-despesas.component.html',
  styleUrls: ['./inserir-despesas.component.css']
})
export class InserirDespesasComponent implements OnInit{
  form?: FormGroup;

  categorias: ListarCategoriaViewModel[] = [];

  constructor(
    private despesasService: DespesasService,
    private categoriasService: CategoriasService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      descricao: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      valor: new FormControl(0, [Validators.required, Validators.min(0.1)]),
      data: new FormControl(new Date().toString().substring(0, 10), [
        Validators.required,
      ]),
      formaPagamento: new FormControl(0, [Validators.required]),
      categoriasSelecionadas: new FormControl([], [Validators.required]),
    });

    this.categoriasService
      .selecionarTodos()
      .subscribe((res) => (this.categorias = res));
  }

  gravar() {
    if (this.form?.invalid) {
      for (let erro of this.form.validate()) {
        this.toastrService.warning(erro);
      }

      return;
    }

    this.despesasService.inserir(this.form?.value).subscribe((res) => {
      this.toastrService.success(
        `A despesa "${res.descricao}" foi cadastrada com sucesso!`,
        'Sucesso'
      );

      this.router.navigate(['/despesas/listar']);
    });
  }
}
