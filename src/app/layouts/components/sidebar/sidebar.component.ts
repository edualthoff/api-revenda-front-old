import { JwtTokenDecrypt } from './../../../core/security/token-jwt/jwt-token.decrypt';
import { AuthTokenStorageService } from './../../../core/security/auth-tokenstorage.service';
import { SystemMenuList } from './../../../core/menu/MenuCreated.const';
import { MenuStructure } from './../../../core/menu/menu-common';
import { Component, OnInit, Input} from '@angular/core';
import { Observable } from 'rxjs';
import { BreakpointState, BreakpointObserver } from '@angular/cdk/layout';



@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent implements OnInit {
  @Input() public title = 'Administrador';
  @Input() public menu: MenuStructure[] = SystemMenuList;

  isHandset: Observable<BreakpointState> = this.breakpointObserver.observe([
    '(max-width: 1440px)'
  ]);

  public opened = true;
  public test = true;
  public moduloMain = 'main';
  constructor(private breakpointObserver: BreakpointObserver, private authTokenStorageService: AuthTokenStorageService ) {}

  ngOnInit(): void { }

  getModulo(modulo: string): string {
    if(modulo === undefined) {
      return this.moduloMain;
    }
    const jwtTokenDecrypt = new JwtTokenDecrypt();
    return jwtTokenDecrypt.getClaimsParseJwt(this.authTokenStorageService.getAuthToken()).modulo.find(x => x === modulo);
  }
}
