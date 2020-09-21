import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import { AngularMaterialModule } from './../../shared/material/angular-material.module';
import { ErrorDialogService } from './error-dialog/services/error-dialog.service';
import { ErrorSnackBarService } from './error-snack-bar/services/error-snack-bar.service';
import { GlobalErrorHandlerService } from './services/global-error-handler.service';
import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorSnackBarComponent } from './error-snack-bar/error-snack-bar.component';



@NgModule({
  declarations: [
    ErrorSnackBarComponent,
    ErrorDialogComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    BrowserAnimationsModule
  ],
  providers: [
    ErrorDialogService,
    ErrorSnackBarService,
    { provide: ErrorHandler, useClass: GlobalErrorHandlerService }
  ],
  entryComponents: [
    ErrorDialogComponent,
    ErrorSnackBarComponent,
  ],
  exports: [
    ErrorDialogComponent,
    ErrorSnackBarComponent
  ]
})
export class ErrorModule { }
