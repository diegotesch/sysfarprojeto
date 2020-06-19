import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from './services/auth/auth-guard.service';

import { ClienteFormComponent } from './cliente/cliente-form/cliente-form.component';
import { ClienteListComponent } from './cliente/cliente-list/cliente-list.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'clientes', component: ClienteListComponent, canActivate: [AuthGuardService] },
  { path: 'cliente', component: ClienteFormComponent, canActivate: [AuthGuardService] },
  { path: 'cliente/:id', component: ClienteFormComponent, canActivate: [AuthGuardService] },
  { path: 'cliente/view/:v', component: ClienteFormComponent, canActivate: [AuthGuardService] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
