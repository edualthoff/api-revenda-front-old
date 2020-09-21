import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItensRoutingModule } from './itens-routing.module';
import { ItensComponent } from './itens.component';
import { AngularMaterialModule } from 'src/app/shared/material/angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ConfirmDialogModule } from 'src/app/shared/components/confirm-dialog/confirm-dialog.module';
import { ItensFormularioComponent } from './itens-formulario/itens-formulario.component';
import { ItensListComponent } from './itens-list/itens-list.component';
import {MatSelectInfiniteScrollModule} from 'ng-mat-select-infinite-scroll';

const importsPadrao = [
  AngularMaterialModule,
  FlexLayoutModule,
  ReactiveFormsModule,
  RouterModule,
  ConfirmDialogModule,
];

@NgModule({
  declarations: [
    ItensComponent,
    ItensFormularioComponent,
    ItensListComponent
  ],
  imports: [
    CommonModule,
    ItensRoutingModule,
    importsPadrao,
    MatSelectInfiniteScrollModule
  ]
})
export class ItensModule { }
