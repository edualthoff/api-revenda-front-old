import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, HostListener, ElementRef, OnInit } from '@angular/core';
import { MessageErrorRequest } from '../services/error-request.modal';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-error-snack-bar',
  //templateUrl: './error-snack-bar.component.html',
  styleUrls: ['./error-snack-bar.component.scss'],
  template: `
    <span style="display: flex; justify-content: center; color: white;">
      {{error}}
    </span>
  `
})
export class ErrorSnackBarComponent implements OnInit{

  public error: string;

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: MessageErrorRequest, private _snackRef: MatSnackBarRef<ErrorSnackBarComponent>, 
    private eRef: ElementRef) {
      this._snackRef = _snackRef;
  }
  ngOnInit(): void {
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
      this._snackRef.dismiss();
    }
  }
}
