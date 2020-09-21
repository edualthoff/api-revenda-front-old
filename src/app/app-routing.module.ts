import { AdminGuard } from './core/security/router/admin.guard';
import { ROUTING_APP } from './core/settings/config.settings';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CommonLayoutComponent } from './layouts/common-layout/common-layout.component';
import { LayoutsModule } from './layouts/layouts.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/** link de retorno PADRAO quando digitado URL errada */
export const routerRedirectError = {
  path: '**', redirectTo: `${ROUTING_APP}/dashboard`, pathMatch: 'full'
};

const routes: Routes = [
  { path: '', redirectTo: `${ROUTING_APP}/dashboard`, pathMatch: 'full' },
  { path: 'auth', loadChildren: () => import('./account/account.module').then(m => m.AccountModule) },
  { path: `${ROUTING_APP}`, component: CommonLayoutComponent, canActivateChild: [AdminGuard], children: [
    { path: 'dashboard', component: DashboardComponent, pathMatch: 'full', },
    { path: 'produtos', loadChildren: () => import('./pages/produtos/produtos.module').then(m => m.ProdutosModule) },
    { path: 'mercado-livre', loadChildren: () => import('./pages/mercado-livre/mercado-livre.module').then(m => m.MercadoLivreModule) },
    routerRedirectError,
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, enableTracing: true }),  LayoutsModule],
  providers: [AdminGuard],
  exports: [RouterModule]
})
export class AppRoutingModule { }
