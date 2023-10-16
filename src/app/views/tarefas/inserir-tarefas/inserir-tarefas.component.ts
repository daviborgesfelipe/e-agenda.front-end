import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TarefasService } from '../services/tarefas.service';
import { ItemTarefaViewModel } from '../models/item-tarefa.view-model';
import { StatusItemTarefa } from '../models/status-tarefa.enum';

@Component({
  selector: 'app-inserir-tarefas',
  templateUrl: './inserir-tarefas.component.html',
  styleUrls: ['./inserir-tarefas.component.css']
})
export class InserirTarefasComponent implements OnInit{
  formTarefa?: FormGroup;
  tituloItemControl?: FormControl;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tarefasService: TarefasService,
    private toastrService: ToastrService
  ) {}
  
  ngOnInit(): void {
    this.formTarefa = this.formBuilder.group({
      titulo: ['', [Validators.required, Validators.minLength(3)]],
      prioridade: [0, [Validators.required]],

      itens: new FormArray([]),
    });

    this.tituloItemControl = this.formBuilder.control('');
  }

  get itens(): FormArray {
    return this.formTarefa?.get('itens') as FormArray;
  }

  campoEstaInvalido(nome: string) {
    return (
      this.formTarefa!.get(nome)!.touched && this.formTarefa!.get(nome)!.invalid
    );
  }

  adicionarItem(): void {
    const item: ItemTarefaViewModel = {
      titulo: this.tituloItemControl?.value,
      status: StatusItemTarefa.Adicionado,
      concluido: false,
    };

    const novoItemGroup = this.formBuilder.group({
      titulo: [item.titulo],
      status: [item.status],
      concluido: [item.concluido],
    });

    this.itens.push(novoItemGroup);

    this.tituloItemControl?.reset();
  }

  removerItem(index: number): void {
    this.itens.removeAt(index);
  }

  gravar(): void {
    if (this.formTarefa?.invalid) {
      const erros = this.formTarefa.validate();

      for (let erro of erros) this.toastrService.warning(erro);

      return;
    }

    this.tarefasService.inserir(this.formTarefa?.value).subscribe((res) => {
      this.toastrService.success(
        `A tarefa "${res.titulo}" foi inserida com sucesso!`,
        'Sucesso'
      );

      console.log(res);
      this.router.navigate(['tarefas', 'listar'])
    });
  }
}
