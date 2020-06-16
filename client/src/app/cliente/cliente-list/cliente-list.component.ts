import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

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

  constructor(
    private clienteService: ClienteService,
    private router: Router
  ) { }

  ngOnInit() {
    this.onRefresh();
  }

  listarClientes() {
    this.clientes$ = this.clienteService.listar()
      .pipe(map(res => res.clientes));
  }

  onRefresh() {
    this.listarClientes();
  }

  rowSelect() {

  }

  rowUnSelect() {

  }

}
