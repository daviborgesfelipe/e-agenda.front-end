import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { VisualizarDespesaViewModel } from '../models/visualizar-despesa.view-model';
import { DespesasService } from '../services/despesa.service';

@Component({
  selector: 'app-excluir-despesas',
  templateUrl: './excluir-despesas.component.html',
  styleUrls: ['./excluir-despesas.component.css']
})
export class ExcluirDespesasComponent implements OnInit{
  despesaVM?: VisualizarDespesaViewModel;

  constructor(
    private despesasService: DespesasService,
    private toastrService: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.despesaVM = this.route.snapshot.data['despesa'];
  }

  gravar() {
    this.despesasService.excluir(this.despesaVM!.id).subscribe(() => {
      this.toastrService.success(
        `A despesa foi excluída com sucesso!`,
        'Sucesso'
      );

      this.router.navigate(['/despesas', 'listar']);
    });
  }
}
