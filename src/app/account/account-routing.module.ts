import { PasswordComponent } from './password/password.component';
import { VerificarComponent } from './verificar/verificar.component';
import { LogedGuard } from './../core/security/router/loged.guard';
import { CadastroComponent } from './cadastro/cadastro.component';
import { LayoutsModule } from './../layouts/layouts.module';
import { LoginComponent } from './login/login.component';
import { BlankLayoutComponent } from './../layouts/blank-layout/blank-layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [{
  path: '', component: BlankLayoutComponent, canActivateChild: [LogedGuard], children: [
    { path: 'login', component: LoginComponent },
    { path: 'cadastro', component: CadastroComponent },
    { path: 'verificar', component: VerificarComponent },
    { path: 'verificar/:code', component: VerificarComponent },
    { path: 'recuperar/senha', component: PasswordComponent, pathMatch: 'full'},
    { path: 'recuperar/senha/:code', component: PasswordComponent },
    { path: '**', redirectTo: 'login', pathMatch: 'full' },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes), LayoutsModule],
  providers: [LogedGuard],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
