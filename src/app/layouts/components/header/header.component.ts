import { AuthTokenStorageService } from './../../../core/security/auth-tokenstorage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private token: AuthTokenStorageService) { }

  ngOnInit(): void {
  }

  buttonSair(){
    this.token.logout();
  }
}
