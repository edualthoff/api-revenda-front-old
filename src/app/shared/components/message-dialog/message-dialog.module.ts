import { AngularMaterialModule } from './../../material/angular-material.module';
import { MessageDialogComponent } from './message-dialog.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    MessageDialogComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule
  ],
  exports: [
    MessageDialogComponent
  ]
})
export class MessageDialogModule { }
