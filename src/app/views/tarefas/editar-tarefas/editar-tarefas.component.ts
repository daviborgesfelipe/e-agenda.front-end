import { Component, OnInit } from '@angular/core';
import { FormsTarefaViewModel } from '../models/forms-tarefas.view-models';
import { ListarTarefaViewModel } from '../models/listar-tarefas.view-models';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TarefasService } from '../services/tarefas.service';
import { ItemTarefaViewModel } from '../models/item-tarefa.view-model';
import { StatusItemTarefa } from '../models/status-tarefa.enum';
import { VisualizarTarefasViewModel } from '../models/visualizar-tarefa.view-model';

@Component({
  selector: 'app-editar-tarefas',
  templateUrl: './editar-tarefas.component.html',
  styleUrls: ['./editar-tarefas.component.css']
})
export class EditarTarefasComponent implements OnInit{
  formTarefa?: FormGroup;
  tituloItemControl?: FormControl;

  constructor(
    private formBuilder: FormBuilder,
    private tarefasService: TarefasService,
    private toastrService: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  
  ngOnInit(): void {
    this.formTarefa = this.formBuilder.group({
      titulo: ['', [Validators.required, Validators.minLength(3)]],
      prioridade: [0, [Validators.required]],

      itens: new FormArray([]),
    });

    this.tituloItemControl = this.formBuilder.control('');

    const tarefa = this.route.snapshot.data['tarefa'];

    this.formTarefa.patchValue(tarefa)

    for(let itemCadastrado of tarefa.itens) {
      const novoItemGroup = this.formBuilder.group({
        id: [itemCadastrado.id],
        titulo: [itemCadastrado.titulo],
        status: [itemCadastrado.status],
        concluido: [itemCadastrado.concluido],
      });
      this.itens.push(novoItemGroup)
    }
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
    const grupo = this.itens.controls.at(index);
    const valorAtual = grupo?.get('status')?.value as StatusItemTarefa;
    const valorAlternado = 
      valorAtual == StatusItemTarefa.Removido 
        ? StatusItemTarefa.Inalterado 
        : StatusItemTarefa.Removido

    grupo?.patchValue({status: valorAlternado})
  }

  concluirItem(index: number): void {
    const grupo = this.itens.controls.at(index);
    const valorAtual = grupo?.get('concluido')?.value as boolean;
    const valorAlternado = !valorAtual;

    grupo?.patchValue({ concluido: valorAlternado });
  }

  gravar(): void {
    if (this.formTarefa?.invalid) {
      const erros = this.formTarefa.validate();

      for (let erro of erros) this.toastrService.warning(erro);

      return;
    }
    const id = this.route.snapshot.paramMap.get('id')!;

    this.tarefasService.editar(id ,this.formTarefa?.value).subscribe((res) => {
      this.toastrService.success(
        `A tarefa "${res.titulo}" foi editada com sucesso!`,
        'Sucesso'
      );

      console.log(res);
      this.router.navigate(['tarefas', 'listar'])
    });
  }
}
