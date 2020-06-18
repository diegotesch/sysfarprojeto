import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators, FormBuilder } from '@angular/forms';

import { finalize } from 'rxjs/operators';

import { FormDefaultComponent } from './../../shared/form-default-component';
import { ClienteService } from './../cliente.service';
import { Cliente } from './../../models/cliente';


@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.css']
})
export class ClienteFormComponent extends FormDefaultComponent implements OnInit {

  cliente: Cliente = new Cliente();
  clienteEspelho: Cliente = new Cliente();
  requisicao: boolean = false;
  visualizar: boolean = false;
  editar: boolean = false;
  titulo: string = 'Cadastro de Clientes'
  labelButtonSalvar: string = 'Salvar';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private clienteService: ClienteService
  ) {
    super();
  }

  ngOnInit() {
    this.activeRoute.params.subscribe(rota => {
      if (rota['id']) {
        this.visualizar = true;
        this.labelButtonSalvar = 'Alterar';
        this.requisicao = true;
        this.clienteService.obterPorId(rota['id'])
          .pipe(finalize(() => this.requisicao = false))
          .subscribe(cliente => {
            this.cliente = cliente.data;
            this.cliente.data_nascimento = this.cliente.data_nascimento ? new Date(`${this.cliente.data_nascimento}T10:30:00-03:00`) : null;
            this.titulo = `Registro de Cliente: ${this.cliente.nome}`;
            this.disableForm();
          })
      }
    })
    this.iniciarForm();
  }

  iniciarForm() {
    this.formulario = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      data_nascimento: [null],
      telefone: ['']
    });
  }

  maskComplete() {
    console.log(this.cliente.telefone);
  }

  salvar() {
    if (this.validarFormulario()) {
      this.requisicao = true;
      this.limparTelefone();
      console.log(this.cliente);
      this.clienteService.salvar(this.cliente)
        .pipe(finalize(() => this.requisicao = false))
        .subscribe(res => this.router.navigate(['clientes']))
    }
  }

  editarCliente() {
    this.titulo = `Atualizar dados do cliente: ${this.cliente.nome}`;
    this.visualizar = false;
    this.enableForm();
  }

  cancelar() {
    this.router.navigate(['clientes']);
  }

  excluir() {
    this.requisicao = true;
    console.log('remover');
    this.clienteService.remover(this.cliente.id)
      .subscribe(res => {
        this.requisicao = false;
        this.router.navigate(['clientes']);
      })
  }

  disableForm() {
    if (this.visualizar && this.cliente.id) {
      this.formulario.get('nome').disable();
      this.formulario.get('email').disable();
      this.formulario.get('telefone').disable();
      this.formulario.get('data_nascimento').disable();
    }
  }

  enableForm() {
    if (!this.visualizar && this.cliente.id) {
      this.formulario.get('nome').enable();
      this.formulario.get('email').enable();
      this.formulario.get('telefone').enable();
      this.formulario.get('data_nascimento').enable();
    }
  }

  limparTelefone() {
    if (!this.cliente.telefone) {
      this.cliente.telefone = null;
      return;
    }
    this.checkMascara();
    this.cliente.telefone = this.cliente.telefone.replace(/\D/g, '');
  }

  checkMascara() {
    if (this.cliente.telefone) {
      let val = this.cliente.telefone.replace(/\D/g, '');
      if (val.length < 10) {
        this.cliente.telefone = '';
      }
    }
  }

}
