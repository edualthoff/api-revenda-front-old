import { ErrorSnackBarService } from './../error/error-snack-bar/services/error-snack-bar.service';
import { MessageErrorRequest } from './../error/services/error-request.modal';
import { ErrorDialogService } from './../error/error-dialog/services/error-dialog.service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse, HttpHeaders
} from '@angular/common/http';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {

    constructor(public errorDialogService: ErrorDialogService, public errorSnackBarService: ErrorSnackBarService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (!request.headers.has('Content-Type')) {
            request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
        }
        return next.handle(request).pipe(
            /*map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    console.log('event--->>>', event);
                }
                return event;
            })*/
            catchError((error: HttpErrorResponse) => {
                let errorMsg;
                if (error.error instanceof ErrorEvent) {
                    //console.log('instanceof ErrorEvent', JSON.stringify(error));
                    //console.log("errorr "+error)
                    errorMsg = `Error: ${error.error.message}`;
                } else {
                    const mm: MessageErrorRequest = Object.assign(MessageErrorRequest, error.error);
                    errorMsg = mm;
                    //console.log("error: ", errorMsg.error.errors.message);
                }
                return throwError(error);
            })
        );
    }
}
