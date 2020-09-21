import { HeaderModule } from './components/header/header.module';
import { SidebarModule } from './components/sidebar/sidebar.module';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonLayoutComponent } from './common-layout/common-layout.component';
import { BlankLayoutComponent } from './blank-layout/blank-layout.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularMaterialModule } from '../shared/material/angular-material.module';

const MaterialAngular = [
  MatToolbarModule,
  MatIconModule,
  MatButtonModule
];

@NgModule({
  declarations: [
    CommonLayoutComponent,
    BlankLayoutComponent,
  ],
  imports: [
    RouterModule,
    CommonModule,
    FlexLayoutModule,
    AngularMaterialModule,
    SidebarModule,
    HeaderModule
  ],
  exports: [
    CommonLayoutComponent,
    BlankLayoutComponent,
  ],
})
export class LayoutsModule { }
