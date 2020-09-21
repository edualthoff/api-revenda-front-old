import { Observable } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-message-dialog',
  //templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.scss'],
  template: `
  <h1 mat-dialog-title>
    {{title}}
  </h1>
  <div mat-dialog-content [innerHTML]="message">
    <!-- {{message}}</> -->
  </div>
  <div mat-dialog-actions>
    <button mat-button color="accent" [mat-dialog-close]="true">{{buttonName}}</button>
    <!-- <button mat-raised-button color="primary" [mat-dialog-close]="true">Sim</button> -->
  </div>
`
})

export class MessageDialogComponent {

  title: string;
  message: string;
  buttonName: string;

  constructor(public dialogRef: MatDialogRef<MessageDialogModel>, @Inject(MAT_DIALOG_DATA) public data: MessageDialogModel) {
    // Update view with given values
    this.title = data.title;
    this.message = data.message;
    this.buttonName = data.buttonName === undefined ? 'OK!' : data.buttonName;
  }

}

/**
 * Class to represent confirm dialog model.
 *
 * It has been kept here to keep it as part of shared component.
 */
export class MessageDialogModel {

  private _buttonName: string;
  public get buttonName(): string {
    return this._buttonName;
  }
  public set buttonName(value: string) {
    this._buttonName = value;
  }

  constructor(@Inject(MatDialog) private dialog: MatDialog, public title: string, public message: string) { }

  /**
   * Retornar um boolena - true para SIM e False para NAO
   *
   * @returns {Observable<boolean>}
   * @memberof ConfirmDialogModel
   */
  public montDialog(): Observable<boolean> {
    return this.dialog.open(MessageDialogComponent, {
      maxWidth: "400px",
      hasBackdrop: false,
      data: this,
    }).afterClosed();
  }
}
