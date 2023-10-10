import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsContatoViewModel } from '../models/forms-contato.view-model';
import { ContatosService } from '../services/contatos.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-editar-contatos',
  templateUrl: './editar-contatos.component.html',
  styleUrls: ['./editar-contatos.component.css']
})
export class EditarContatosComponent {
  formulario!: FormGroup;
  contatoViewModel!: FormsContatoViewModel;
  idSelecionado: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private contatoService: ContatosService,
    private router: Router,
    private route: ActivatedRoute,
    private toastService: ToastrService  
  ) {}

  get email() {
    return this.formulario.get('email');
  }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      nome: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.email, Validators.required]),
      telefone: new FormControl('', [Validators.required]),
      cargo: new FormControl('', [Validators.required]),
      empresa: new FormControl('', [Validators.required]),
    });

    this.idSelecionado = this.route.snapshot.paramMap.get('id');

    if (!this.idSelecionado) return;

    this.contatoService.selecionarPorId(this.idSelecionado)
      .subscribe((_contato) => {
        this.formulario.patchValue(_contato);
      }
    );
  }

  gravar(){
    if (this.formulario.invalid) {
      for (let erro of this.formulario.validate()) {
        this.toastService.warning(erro);
      }
      return;
    }
    this.contatoViewModel = this.formulario.value

    this.contatoService.editar(this.idSelecionado!, this.contatoViewModel).subscribe({
      next: (contato: FormsContatoViewModel) => this.processarSucesso(contato),
      error: (err: Error) => this.processarFalha(err),
    });
  }

  processarSucesso(contato: FormsContatoViewModel) {
    this.toastService.success(
      `O contato "${contato.nome}" foi editado com sucesso!`,
      'Sucesso'
    );

    this.router.navigate(['/contatos/listar']);
  }

  processarFalha(erro: Error) {
    this.toastService.error(erro.message, 'Error');
  }

  campoEstaInvalido(nome: string) {
    return this.formulario.get(nome)!.touched && this.formulario.get(nome)!.invalid;
  }
}
