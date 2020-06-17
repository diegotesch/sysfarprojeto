import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

import { Cliente } from './../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private readonly api = '/api/cliente';

  constructor(
    private http: HttpClient
  ) { }

  public listar(filtro: string = ''): Observable<any> {
    return this.http.get(`${this.api}${filtro}`);
  }

  public salvar(dados: Cliente): Observable<any> {
    if (!dados.id) {
      return this.cadastrar(dados);
    }
    return this.atualizar(dados);
  }

  public obterPorId(id: number): Observable<any> {
    return this.http.get(`${this.api}/${id}`);
  }

  public remover(id: number): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }

  private cadastrar(dados: Cliente): Observable<any> {
    return this.http.post(`${this.api}`, dados);
  }

  private atualizar(dados: Cliente): Observable<any> {
    return this.http.put(`${this.api}/${dados.id}`, dados);
  }
}
