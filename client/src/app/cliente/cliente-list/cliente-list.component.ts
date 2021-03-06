import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormBuilder } from '@angular/forms';

import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { Filtro } from './../../models/filtro';
import { Cliente } from './../../models/cliente';
import { ClienteService } from './../cliente.service';

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css']
})
export class ClienteListComponent implements OnInit {

  clientes: Cliente[] = [];
  clientes$: Observable<Cliente[]>;
  requisicao = false;
  filtro: Filtro = new Filtro();
  btVisualizar: boolean = false;
  btEditar: boolean = false;
  loading: boolean = false;
  selecionado: number = null;

  constructor(
    private clienteService: ClienteService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.onRefresh();
  }


  listarClientes(filtro: string = '') {
    this.clientes$ = this.clienteService.listar(filtro)
      .pipe(tap(), map(res => res[0]));
  }

  getIdade(data) {
    if (!data) {
      return;
    }
    let hoje = new Date;
    let nascimento = new Date(`${data}T10:30:00-03:00`);
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    if (new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate()) <
        new Date(hoje.getFullYear(), nascimento.getMonth(), nascimento.getDate())){
      idade--;
    }
    return idade;
  }

  onRefresh() {
    this.listarClientes();
  }

  filtrar() {
    let busca = '';
    if (this.filtro.nome) {
      busca += `nome=${this.filtro.nome}&`;
    }

    if (this.filtro.nascimento) {
      busca += `data_nascimento=${this.filtro.nascimento.getFullYear()}-${this.filtro.nascimento.getMonth()+1}-${this.filtro.nascimento.getDate()}`
    }

    if (busca) {
      busca = '?' + busca;
    }
    this.listarClientes(busca);
  }

  rowSelect(e) {
    this.btVisualizar = true;
    this.btEditar = true;
    this.selecionado = e.data.id;
  }

  rowUnSelect(e) {
    this.btVisualizar = false;
    this.btEditar = false;
    this.selecionado = null;
  }

  cadastrar() {
    this.router.navigate(['cliente']);
  }

  visualizar() {
    if (this.btVisualizar) {
      this.router.navigate(['cliente', 'view', this.selecionado]);
    }
  }

  editar() {
    if (this.btEditar) {
      this.router.navigate(['cliente', this.selecionado]);
    }
  }

  dataBr = {
    firstDayOfWeek: 1,
    dayNames: ["Domingo", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado"],
    dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
    dayNamesMin: ["D", "S", "T", "Q", "Q", "S", "S"],
    monthNames: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
    monthNamesShort: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
    today: 'Hoje',
    clear: 'Limpar'
  };

}
