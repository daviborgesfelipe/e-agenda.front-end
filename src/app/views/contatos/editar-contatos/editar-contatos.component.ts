import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsContatoViewModel } from '../models/forms-contato.view-model';
import { ContatosService } from '../services/contatos.service';

@Component({
  selector: 'app-editar-contatos',
  templateUrl: './editar-contatos.component.html',
  styleUrls: ['./editar-contatos.component.css']
})
export class EditarContatosComponent {
  form!: FormGroup;
  contatoVM!: FormsContatoViewModel;
  idSelecionado: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private contatoService: ContatosService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nome: new FormControl(''),
      email: new FormControl(''),
      telefone: new FormControl(''),
      cargo: new FormControl(''),
      empresa: new FormControl(''),
    });

    this.idSelecionado = this.route.snapshot.paramMap.get('id');

    if (!this.idSelecionado) return;

    this.contatoService.selecionarPorId(this.idSelecionado).subscribe((res) => {
      this.form.patchValue(res);
    });
  }

  gravar() {
    this.contatoVM = this.form.value;

    this.contatoService
      .editar(this.idSelecionado!, this.contatoVM)
      .subscribe((res) => {
        console.log(res);

        this.router.navigate(['/contatos/listar']);
      });
  }
}
