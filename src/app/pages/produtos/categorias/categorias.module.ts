import { CategoriasRoutingModule } from './categorias-routing.module';
import { CommonModule } from '@angular/common';
import { FormularioComponent } from './formulario/formulario.component';
import { CategoriasComponent } from './categorias.component';
import { ConfirmDialogModule } from './../../../shared/components/confirm-dialog/confirm-dialog.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularMaterialModule } from './../../../shared/material/angular-material.module';
import { NgModule } from '@angular/core';
import { FormularioDialogComponent } from './formulario-dialog/formulario-dialog.component';


const importsPadrao = [
  AngularMaterialModule,
  FlexLayoutModule,
  ReactiveFormsModule,
  RouterModule,
  ConfirmDialogModule,
];

@NgModule({
  declarations: [
    CategoriasComponent,
    FormularioComponent,
    FormularioDialogComponent
  ],
  imports: [
    CommonModule,
    CategoriasRoutingModule,
    importsPadrao,
  ],
  providers: [
  ]
})
export class CategoriasModule { }
