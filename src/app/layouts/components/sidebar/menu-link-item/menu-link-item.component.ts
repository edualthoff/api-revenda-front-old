import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-link-item',
  //templateUrl: './menu-link-item.component.html',
  styleUrls: ['./../sidebar.component.scss'],
  template: `
    <a *ngIf="data.link"
      mat-list-item 
      class="menu-sidenav-link"
      [class.menu-sidenav-link--current]="router.url === data.link"
      [routerLinkActive]="data.active"
      [routerLink]="data.link">
          <mat-icon class="sidenav-icon material-icons-outlined">{{data.icon}}</mat-icon>{{data.name}}
    </a>
  `,
})
export class MenuLinkItemComponent implements OnInit {
  @Input() public data;

  constructor(public router: Router) {}

  ngOnInit(): void {
  }

}
