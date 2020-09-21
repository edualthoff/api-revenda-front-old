import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, HostListener, ElementRef, ViewChild } from '@angular/core';
import { MessageErrorRequest } from '../services/error-request.modal';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-error-dialog',
  //templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.scss'],
  template: `
    <div>
      <div>
          <p>
              {{error}}
          </p>
          <p>
              Status: {{code}}
          </p>
      </div>
      <div mat-dialog-actions>
       <!--<button mat-button color="accent" #butt [mat-dialog-close]="true">2222</button>
         <button mat-raised-button color="primary" [mat-dialog-close]="true">Sim</button> -->
      </div>
    </div>
`
})
export class ErrorDialogComponent {
  title = 'Atenção!! Error';
  public error: string;
  public code: string;

  constructor(public dialogRef: MatDialogRef<ErrorDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: MessageErrorRequest, private eRef: ElementRef) {
    this.dialogRef = dialogRef;
  }

  ngOnInit(): void {
    this.code = this.data.code;
    if(this.data.errors !== undefined) {
      this.error = this.data.errors.reason;
    } else {
      this.error = this.data.message;
    }

  }

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if(this.eRef.nativeElement.contains(event.target)) {
    } else {
      this.closeDialog();
    }
  }

  closeDialog() {
    this.dialogRef.close(true);
  }
}
