import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularMaterialModule } from './../../../shared/material/angular-material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';



@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FlexLayoutModule
  ],
  exports:[
    HeaderComponent
  ]
})
export class HeaderModule { }
