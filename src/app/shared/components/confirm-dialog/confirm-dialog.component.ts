import { Observable } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  //templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
  template: `
    <h1 mat-dialog-title>
      {{title}}
    </h1>
    <div mat-dialog-content>
      <p>{{message}}</p>
    </div>
    <div mat-dialog-actions>
      <button mat-button [mat-dialog-close]="false">Não</button>
      <button mat-raised-button color="primary" [mat-dialog-close]="true">Sim</button>
    </div>
  `
})
export class ConfirmDialogComponent {

  title: string;
  message: string;

  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogModel) {
    // Update view with given values
    this.title = data.title;
    this.message = data.message;
  }

}

/**
 * Class to represent confirm dialog model.
 *
 * It has been kept here to keep it as part of shared component.
 */
export class ConfirmDialogModel {

  constructor(@Inject(MatDialog) private dialog: MatDialog, public title: string, public message: string) {}

  /**
   * Retornar um boolena - true para SIM e False para NAO
   *
   * @returns {Observable<boolean>}
   * @memberof ConfirmDialogModel
   */
  public montDialog(): Observable<boolean> {
  return this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      hasBackdrop: false,
      data: this,
    }).afterClosed();
  }
}
