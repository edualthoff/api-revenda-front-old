import { HttpPasswordService } from './services/http-password.service';
import { HttpVerificarService } from './services/http-verificar.service';
import { HttpCadastroService } from './services/http-cadastro.service';
import { HttpLoginService } from './services/http-login.service';
import { MessageDialogModule } from './../shared/components/message-dialog/message-dialog.module';
import { AngularMaterialModule } from './../shared/material/angular-material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { LoginComponent } from './login/login.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { VerificarComponent } from './verificar/verificar.component';
import { PasswordComponent } from './password/password.component';


@NgModule({
  declarations: [
    LoginComponent,
    CadastroComponent,
    VerificarComponent,
    PasswordComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    MessageDialogModule
  ],
  providers: [
    HttpLoginService,
    HttpCadastroService,
    HttpVerificarService,
    HttpPasswordService,
  ]
})
export class AccountModule { }
