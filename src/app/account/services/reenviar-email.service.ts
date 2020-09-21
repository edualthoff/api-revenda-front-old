import { Subscription } from 'rxjs';
import { HttpVerificarService } from './http-verificar.service';
import { MessageDialogModel } from './../../shared/components/message-dialog/message-dialog.component';
import { Injectable, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

/** Reenviar email de verificacao de cadastro  */
@Injectable({
  providedIn: 'root'
})
export class ReenviarEmailService implements OnDestroy {

  private subscription = new Subscription();

  constructor(private dialog: MatDialog, private httpVerificarService: HttpVerificarService) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  buttonEnviarEmail(email: string) {
    const msg: string = 'Faltou verificar o e-mail <br /> Acesse o seu email e click no link enviado para confirmar o cadastro.';
    this.subscription.add(
      this.httpVerificarService.postEnviarEmal(email).subscribe(() => {
        const dialog = new MessageDialogModel(this.dialog, 'Informativo', msg);
        dialog.montDialog();
      })
    );
  }
}
