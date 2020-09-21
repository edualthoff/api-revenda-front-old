import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-submenu-item',
  //templateUrl: './submenu-item.component.html',
  styleUrls:  ['./../sidebar.component.scss'],
  template: `
    <a mat-list-item
      class="menu-sidenav-link"
      [class.menu-sidenav-link--current]="shown"
      [routerLinkActive]="data.active"
      [routerLink]="data.link"
      (click)="shown = !shown">
          <mat-icon class="sidenav-icon">{{data.icon}}</mat-icon> {{data.name}}<mat-icon class="sidenav-icon">keyboard_arrow_down</mat-icon>
    </a>
    <div *ngIf="shown">
      <app-menu-item *ngFor="let child of data.children" [data]="child"></app-menu-item>
    </div>
  `
})
export class SubmenuItemComponent implements OnInit {
  @Input() public data;
  public shown = false;
  console;
  constructor(public router: Router) { }

  ngOnInit(): void {
  }

}
