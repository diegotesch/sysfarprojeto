import { Component, OnInit } from '@angular/core';

import { TokenStorageService } from './services/auth/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'client';
  exibirLogout: boolean = false;

  constructor(
    private token: TokenStorageService
  ) {

  }

  ngOnInit() {
    this.exibirLogout = false;
    if (this.token.getToken()) {
      this.exibirLogout = true;
    }
  }

  sair() {
    this.token.logout();
    window.location.reload();
  }

}
