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
      .pipe(tap(console.log), map(res => {
        return res[0].data
      }));
  }

  getIdade(data) {
    let hoje = new Date;
    let nascimento = new Date(data);
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

    this.filtro = new Filtro();

    if (busca) {
      busca = '?' + busca;
    }
    this.listarClientes(busca);
  }

  rowSelect(e) {
    this.btVisualizar = true;
    this.selecionado = e.data.id;
  }

  rowUnSelect() {
    this.btVisualizar = false;
    this.selecionado = null;
  }

  cadastrar() {
    this.router.navigate(['cliente']);
  }

  visualizar() {
    this.router.navigate(['cliente', this.selecionado]);
  }

}
