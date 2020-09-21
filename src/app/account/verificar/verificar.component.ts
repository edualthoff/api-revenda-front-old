import { Subscription } from 'rxjs';
import { AuthTokenStorageService } from './../../core/security/auth-tokenstorage.service';
import { MessageDialogModel } from './../../shared/components/message-dialog/message-dialog.component';
import { HttpVerificarService } from './../services/http-verificar.service';
import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-verificar',
  templateUrl: './verificar.component.html',
  styleUrls: ['./verificar.component.scss']
})
export class VerificarComponent implements OnInit, OnDestroy {

  public emailForm = new FormControl('', [Validators.required, Validators.email]);
  private subscription = new Subscription();

  switch_expression = false;
  constructor(private _activedRoute: ActivatedRoute, private router: Router, private httpVerificarService: HttpVerificarService,
    private dialog: MatDialog, private authTokenStorageService: AuthTokenStorageService) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.verificarEmail(this._activedRoute.snapshot.params['code']);
  }

  buttonEnviarEmail(email: string) {
    this.subscription.add(
      this.httpVerificarService.postEnviarEmal(email).subscribe(() => {
        const dialog = new MessageDialogModel(this.dialog, 'Informativo', 'Oba!! deu tudo certo. <br /> Agora acesse o seu email e click no link enviado para confirmar o cadastro.');
        dialog.montDialog();
        this.router.navigate([`../../login/`], { relativeTo: this._activedRoute });
        this.authTokenStorageService.logout();
      })
    );
  }

  /** Verificar o email atravez do link enviado por email com o codigo de ativacao */
  private verificarEmail(code) {
    if (code !== undefined) {
      this.switch_expression = true;
      this.subscription.add(
        this.httpVerificarService.postVerificar(code).subscribe(
          () => { },
          () => { setTimeout(() => { this.switch_expression = false }, 300); },
          () => {
            this.authTokenStorageService.logout();
            setTimeout(() => { this.router.navigate(['/']); }, 600);
          },
        )
      );
    }
  }
}
