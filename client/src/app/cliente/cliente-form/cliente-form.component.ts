import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormBuilder } from '@angular/forms';

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
  requisicao: boolean = false;
  mask: string = "(99) 9999-9999?9";

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private clienteService: ClienteService
  ) {
    super();
  }

  ngOnInit() {
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
      this.cliente.telefone = this.cliente.telefone.replace(/\D/g, '');
      this.clienteService.salvar(this.cliente)
        .subscribe(res => {
          this.requisicao = false;
          this.router.navigate(['clientes']);
        })
    }
  }

  checkMascara() {
    let val = this.cliente.telefone.replace(/\D/g, '');
    if (val.length < 10) {
     this.cliente.telefone = '';
    }

  }

}
