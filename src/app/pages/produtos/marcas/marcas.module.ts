import { ConfirmDialogModule } from './../../../shared/components/confirm-dialog/confirm-dialog.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularMaterialModule } from './../../../shared/material/angular-material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarcasRoutingModule } from './marcas-routing.module';
import { MarcasComponent } from './marcas.component';
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
    MarcasComponent,
    FormularioDialogComponent
  ],
  imports: [
    CommonModule,
    importsPadrao,
    MarcasRoutingModule
  ]
})
export class MarcasModule { }
