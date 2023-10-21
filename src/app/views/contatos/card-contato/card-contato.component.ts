import { Component, Input, OnInit } from '@angular/core';

import { ListarContatoViewModel } from '../models/listar-contato.view-model';
import { ContatosService } from '../services/contatos.service';
import { FormsContatoViewModel } from '../models/forms-contato.view-model';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-card-contato',
  templateUrl: './card-contato.component.html',
  styleUrls: ['./card-contato.component.css']
})
export class CardContatoComponent implements OnInit{
  @Input({ required: true }) contato!: ListarContatoViewModel;
  tituloCard = `Contato`

  isFavorito: boolean = false; // Estado local para controlar o status de favorito


  constructor( 
    private contatoService: ContatosService,
    private toastService: ToastrService
  ){
    console.log(this.contato)
  }

  ngOnInit(): void {
    this.isFavorito = this.contato.favorito;
  }

  atualizarListaFavoritos(){
    const favoritado = this.converterParaContatoFormVM(this.contato);
    this.contatoService.favoritar(this.contato.id, favoritado)

    .subscribe({
      next: (contato) => {
        this.isFavorito = contato.favorito;
        this.processarSucesso(contato),
        console.log(contato)
      },
      error: (erro) => {
        this.processarFalha(erro)
      },
    });
  }

  private processarSucesso(contato: any) {
    const acao = contato.favorito ? "Adicionado" : "Removido";
    this.toastService.success(
      `O contato "${contato.nome}" foi ${acao} aos Favoritos com sucesso!`,
      'Sucesso'
    );
  }

  private processarFalha(erro: Error) {
    this.toastService.error(erro.message, 'Error');
  }

  private converterParaContatoFormVM(contato: any): FormsContatoViewModel {
    return new FormsContatoViewModel(
      contato.id,
      contato.nome,
      contato.telefone,
      contato.cargo,
      contato.empresa,
      contato.favorito
    );
  }
}
