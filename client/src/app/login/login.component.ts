import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormBuilder } from '@angular/forms';

import { FormDefaultComponent } from './../shared/form-default-component';
import { Login } from './../models/Login';
import { LoginService } from './login.service';
import { TokenStorageService } from './../services/auth/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends FormDefaultComponent implements OnInit {

  credenciais: Login = new Login();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private tokenService: TokenStorageService
  ) {
    super();
  }

  ngOnInit() {
    if (this.tokenService.getToken()) {
      this.router.navigate(['clientes']);
    }
    this.iniciarForm();
  }

  iniciarForm() {
    this.formulario = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  login() {
    if (this.validarFormulario()) {
      this.loginService.entrar(this.credenciais)
        .subscribe(res => {
          let { access_token, user } = res;
          this.tokenService.saveToken(access_token);
          this.tokenService.saveUser(user);

          window.location.reload();
        })
    }
  }

}
