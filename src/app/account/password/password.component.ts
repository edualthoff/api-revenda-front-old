import { MessageDialogModel } from './../../shared/components/message-dialog/message-dialog.component';
import { Subscription } from 'rxjs';
import { HttpPasswordService } from './../services/http-password.service';
import { ActivatedRoute, Router } from '@angular/router';
import { patternPassword } from './../../core/settings/pattern-validators.settings';
import { CustomValidators } from './../../shared/functions/formcontrol.functions';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit, OnDestroy, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit, OnDestroy {
  switch_expression = true;
  public emailForm: FormControl;
  public passwordForm: FormGroup;
  private subscription = new Subscription();
  private codigo: string;

  constructor(private activedRoute: ActivatedRoute, private router: Router, private formBuilder: FormBuilder,
    private httpPassword: HttpPasswordService, private dialog: MatDialog) {
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.emailForm = new FormControl('', [Validators.required, Validators.email]);
    if (this.activedRoute.snapshot.params['code'] !== undefined) {
      console.log("onit "+this.activedRoute.snapshot.params['code'])
      this.switch_expression = false;
      this.codigo = this.activedRoute.snapshot.params['code'];
      this.formPassword();
    }
  }

  private formPassword() {
    this.passwordForm = this.formBuilder.group({
      senha: new FormControl('', [Validators.required, Validators.pattern(patternPassword)]),
      senhaConfirmar: new FormControl('', Validators.required)
    }, { validator: CustomValidators.childrenEqual });
  }

  buttonAtualizarPassword(password: string) {
    this.subscription.add(
      this.httpPassword.postEnviarPassword(password, this.codigo).subscribe(() => {
        const dialog = new MessageDialogModel(this.dialog, 'Informativo', 'Oba!! deu tudo certo. <br /> Senha alterada com sucesso.');
        dialog.montDialog();
        this.router.navigate([`../../../login/`], { relativeTo: this.activedRoute });
      })
    );
  }

  buttonEnviarEmail(email: string) {
    this.subscription.add(
      this.httpPassword.postEnviarEmal(email).subscribe(() => {
        const dialog = new MessageDialogModel(this.dialog, 'Informativo', 'Oba!! deu tudo certo. <br /> Agora acesse o seu email e click no link enviado para redefinir a senha!.');
        dialog.montDialog();
        this.router.navigate([`../../login/`], { relativeTo: this.activedRoute });
      })
    );
  }
}
