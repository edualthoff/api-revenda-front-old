import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { MenuLinkItemComponent } from './menu-link-item/menu-link-item.component';
import { SubmenuItemComponent } from './submenu-item/submenu-item.component';


const MaterialAngular = [
  MatSidenavModule,
  MatIconModule,
  MatButtonModule,
  MatToolbarModule,
  MatListModule
];

@NgModule({
  declarations: [
    SidebarComponent,
    MenuItemComponent,
    MenuLinkItemComponent,
    SubmenuItemComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    MaterialAngular
  ],
  exports: [SidebarComponent]
})
export class SidebarModule { }
