import { Subscription } from 'rxjs';
import { MessageDialogModel } from './../../shared/components/message-dialog/message-dialog.component';
import { HttpCadastroService } from './../services/http-cadastro.service';
import { UsuarioModal } from './../services/cadastro.modal';
import { Router, ActivatedRoute } from '@angular/router';
import { MyErrorStateMatcher, CustomValidators, ConfirmValidParentMatcher } from './../../shared/functions/formcontrol.functions';
import { patternPassword } from './../../core/settings/pattern-validators.settings';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit, OnDestroy {

  public cadastroForm: FormGroup;
  matcher = new MyErrorStateMatcher();
  matcherParent = new ConfirmValidParentMatcher();

  private subscription = new Subscription();

  constructor(private formBuilder: FormBuilder, private router: Router, private activedRoute: ActivatedRoute,
    private dialog: MatDialog, private httpCadastro: HttpCadastroService) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.createForm();
  }

  private createForm(): void {
    this.cadastroForm = this.formBuilder.group({
      nome: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(128)]),
      sobrenome: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(128)]),
      emailGroup: this.formBuilder.group({
        email: new FormControl('', [
          Validators.required,
          Validators.email
        ]),
        confirmEmail: new FormControl('', Validators.required)
      }, { validator: CustomValidators.childrenEqual }),
      senha: new FormControl('', [Validators.required, Validators.pattern(patternPassword)]),
      codigoPromocional: new FormControl('', Validators.required),
      aceitarTermo: new FormControl('', [Validators.requiredTrue])
    });
  }

  buttonLogin() {
    this.router.navigate([`../login/`], { relativeTo: this.activedRoute });
  }

  enviarCadastro() {
    const user = {} as UsuarioModal;
    user.email = this.cadastroForm.get('emailGroup').get('email').value;
    user.senha = this.cadastroForm.get('senha').value;
    user.pessoa = {
      nome: this.cadastroForm.get('nome').value,
      sobrenome: this.cadastroForm.get('sobrenome').value,
      tenantId: ''
    };
    const codigoCadastro = this.cadastroForm.get('codigoPromocional').value;
    this.subscription = this.httpCadastro.postCadastroComCodigo(user, codigoCadastro).subscribe(
      () => {
        const dialog = new MessageDialogModel(this.dialog, 'Informativo', 'Oba!! deu tudo certo. <br /> Agora acesse o seu email e click no link enviado para confirmar o cadastro.');
        dialog.montDialog();
        this.router.navigate([`../login/`], { relativeTo: this.activedRoute });
      }
    );
  }
}
