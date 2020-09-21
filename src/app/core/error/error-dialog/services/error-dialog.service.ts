import { MessageErrorRequest } from './../../services/error-request.modal';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Injectable, NgZone } from '@angular/core';
import { ErrorDialogComponent } from '../error-dialog.component';

@Injectable()
export class ErrorDialogService {

    dialogRef: MatDialogRef<ErrorDialogComponent>;
    public isDialogOpen: Boolean = false;

    constructor(public dialog: MatDialog, private zone: NgZone) { }

    openDialog(data: MessageErrorRequest): any {
        if (this.isDialogOpen) {
            return false;
        }
        this.isDialogOpen = true;
        this.zone.run(() => {
            this.dialogRef = this.dialog.open(ErrorDialogComponent, {
                //width: '300px',
                //height: '150px;',
                hasBackdrop: false,
                data: data
            });
        });
        this.dialogRef.afterClosed().subscribe((result: boolean) => {
            this.isDialogOpen = false;
            //let animal = result;
        });
    }
}
