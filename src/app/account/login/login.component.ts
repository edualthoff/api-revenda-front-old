import { Subscription } from 'rxjs';
import { AuthTokenStorageService } from './../../core/security/auth-tokenstorage.service';
import { HttpLoginService } from './../services/http-login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { patternPassword } from './../../core/settings/pattern-validators.settings';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  public loginForm: FormGroup;
  private subscription = new Subscription();

  constructor(private formaBuilder: FormBuilder, private router: Router, private activedRoute: ActivatedRoute,
    private httpLogin: HttpLoginService, private authTokenStorageService: AuthTokenStorageService) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.createForm();
  }

  private createForm(): void {
    this.loginForm = this.formaBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      senha: new FormControl('', [Validators.required, Validators.pattern(patternPassword)])
    });
  }

  buttonCadastro() {
    this.router.navigate([`../cadastro/`], { relativeTo: this.activedRoute });
  }

  buttonRecuperarSenha() {
    this.router.navigate([`../recuperar/senha`], { relativeTo: this.activedRoute });
  }

  buttonLogin() {
    if (this.loginForm.status === 'VALID') {
      this.subscription = this.httpLogin.getLoginUsername(this.loginForm.get('email').value, this.loginForm.get('senha').value)
      .subscribe((token) => {
        this.authTokenStorageService.setAuthSessionToken(token);
        this.router.navigate(['/']);
      });
    }
  }
}
