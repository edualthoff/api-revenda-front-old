import { AuthTokenStorageService } from './auth-tokenstorage.service';
import { ROTA_LOGIN } from './../settings/config.settings';
import { Router } from '@angular/router';
import { JwtTokenDecrypt } from './token-jwt/jwt-token.decrypt';
import { JwtUserToken } from './token-jwt/jwt-token.modal';
import { Injectable, OnInit } from '@angular/core';

/*********************************
 * Servico para validar as roles e o nivel de autenticaçao do usuario.
 * Verifica a role informada com as roles que possui no token
 * O Token Active armazenado Storage.
 * @param token
**********************************/
@Injectable({
  providedIn: 'root'
})
export class RoleActiveService implements OnInit {

  private roles: Array<string> = [];

  constructor(private token: AuthTokenStorageService, private router: Router) {
    this.rolesActive(this.token.getAuthToken(), this.roles);
  }

  ngOnInit(): void { }

  private rolesActive(token: string, roles: Array<string>) {
    try {
      let jwtUserToken: JwtUserToken;
      const jwtTokenDecrypt: JwtTokenDecrypt = new JwtTokenDecrypt();

      jwtUserToken = jwtTokenDecrypt.getClaimsParseJwt(token);
      //console.log("jwtTokenDecrypt Teste" + JSON.stringify(jwtUserToken)+"\n\n"+jwtUserToken.session)
      jwtUserToken.authorities.forEach(x => {
        //console.log("jwtTokenDecrypt Teste role " + x+" e e "+x)
        roles.push(x);
      });
    } catch {
      this.router.navigate([ROTA_LOGIN]);
    }
  }

  /*********************************
    * @param role (role informada para ser comparada com as do token)
    * @returns true ou false
  **********************************/
  roleValidete(role: string): boolean {
    let valid = false;
    //console.log("roleValidete " + this.roles.length+" ")
    if (this.roles.length !== 0) {
      this.roles.forEach((valueRole: string) => {
        //console.log("roleValidete 22 " + valueRole+" "+role)
        if (valueRole === role) {
          valid = true;
        }
      });
      return valid;
      /*}else{
        console.log("RoleActiveService Teste " + this.token.getAuthToken())
        this.router.navigate( ['/cadastro'] );
      }*/
    }
  }
}
