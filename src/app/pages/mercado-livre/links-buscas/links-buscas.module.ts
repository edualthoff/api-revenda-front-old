import { TimePickerModule } from './../../../shared/components/time-picker/time-picker.module';
import { NgxMaskModule } from 'ngx-mask';
import { LinksFormularioComponent } from './links-formulario/links-formulario.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LinksBuscasRoutingModule } from './links-buscas-routing.module';
import { LinksBuscasComponent } from './links-buscas.component';
import { AngularMaterialModule } from 'src/app/shared/material/angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ConfirmDialogModule } from 'src/app/shared/components/confirm-dialog/confirm-dialog.module';
import { LinksListComponent } from './links-list/links-list.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

const importsPadrao = [
  AngularMaterialModule,
  FlexLayoutModule,
  ReactiveFormsModule,
  RouterModule,
  ConfirmDialogModule,
  NgxMaskModule
];

@NgModule({
  declarations: [
    LinksBuscasComponent,
    LinksListComponent,
    LinksFormularioComponent
  ],
  imports: [
    CommonModule,
    LinksBuscasRoutingModule,
    importsPadrao,
    TimePickerModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
  ]
})
export class LinksBuscasModule { }
