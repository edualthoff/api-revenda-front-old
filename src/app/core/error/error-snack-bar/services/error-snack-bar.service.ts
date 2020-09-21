import { Injectable, NgZone } from '@angular/core';
import { MessageErrorRequest } from '../../services/error-request.modal';
import { ErrorSnackBarComponent } from '../error-snack-bar.component';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable()
export class ErrorSnackBarService {
  private durationInSeconds = 10;

  constructor(private _snackBar: MatSnackBar, private zone: NgZone) {
  }

  openSnackBar(data: MessageErrorRequest) {
    console.log("ErrorSnackBarService", data.message);
    const config = new MatSnackBarConfig();
    config.horizontalPosition = 'center';
    config.verticalPosition = 'top';
    config.duration = (this.durationInSeconds * 1000);
    config.data = data;
    config.panelClass = ['snackbar-error'];

    this.zone.run(() => { this._snackBar.openFromComponent(ErrorSnackBarComponent, config); });

  }

}
