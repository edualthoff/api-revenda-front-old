import { ErrorSnackBarService } from './../error-snack-bar/services/error-snack-bar.service';
import { ErrorDialogService } from './../error-dialog/services/error-dialog.service';
import { Router } from '@angular/router';
import { Injectable, ErrorHandler, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageErrorRequest, MessageErrorRequestCustom } from './error-request.modal';

@Injectable()
export class GlobalErrorHandlerService implements ErrorHandler {

  constructor(private injector: Injector) { }

  handleError(error: HttpErrorResponse): void {
    if (error instanceof HttpErrorResponse) {
      let messageErrorRequest: MessageErrorRequest = Object.assign(MessageErrorRequest,);
      if(error.statusText === 'Unknown Error') {
        const message = new MessageErrorRequestCustom();
        message.message = "Error desconhecido"
        this.injector.get(ErrorSnackBarService).openSnackBar(message);
      }
      switch (error.status) {
        case 401:      //login
          this.injector.get(ErrorDialogService).openDialog(messageErrorRequest);
          this.injector.get(Router).navigateByUrl("/auth/login");
          //console.log(`redirecionar login`);
          break;
        case 403:     //forbidden
          this.injector.get(ErrorDialogService).openDialog(messageErrorRequest);
          this.injector.get(Router).navigateByUrl("/auth/login");
          //console.log(`redirecionar login`);
          break;
          case 102:     //forbidden
          console.log(`redirecionar 102`);
          break;
          case 0:     //Error Sem conexao
          const message = new MessageErrorRequestCustom();
          message.message = "Error: Sem conexão com a internet"
          this.injector.get(ErrorSnackBarService).openSnackBar(message);
          break;
        default:
          console.log("mesess default " + error.status);
          this.injector.get(ErrorSnackBarService).openSnackBar(messageErrorRequest);
          break;
      }
    }
  }
}
