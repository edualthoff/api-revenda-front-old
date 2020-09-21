import { MenuStructure } from './../../../../core/menu/menu-common';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-menu-item',
  styleUrls: ['./../sidebar.component.scss'],
  template: `
  <ng-container *ngIf="data.modulo === modulo || modulo === moduloMain">
    <app-menu-link-item *ngIf="data.link" [data]="data"></app-menu-link-item>
    <app-submenu-item *ngIf="data.children" [data]="data"></app-submenu-item>
  </ng-container>
  `,
})

export class MenuItemComponent implements OnInit {
  @Input() public data: MenuStructure;
  @Input() public modulo?: string;
  @Input() public moduloMain?: string;

  constructor() { }

  ngOnInit(): void { }
}
