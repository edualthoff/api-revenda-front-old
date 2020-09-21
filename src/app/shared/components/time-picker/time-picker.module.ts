import { OverlayModule } from '@angular/cdk/overlay';
import { AngularMaterialModule } from './../../material/angular-material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimePickerComponent } from './time-picker.component';
import { TimePickerDirective } from './time-picker.directive';



@NgModule({
  declarations: [
    TimePickerComponent,
    TimePickerDirective
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    OverlayModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    TimePickerComponent,
    TimePickerDirective
  ]
})
export class TimePickerModule { }
