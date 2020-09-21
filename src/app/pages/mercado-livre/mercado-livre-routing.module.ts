import { routerRedirectError } from './../../app-routing.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [{
  path: '', children: [
    { path: 'links-buscas', loadChildren: () => import('./links-buscas/links-buscas.module').then(m => m.LinksBuscasModule) },
    /** link de retorno quando digitado URL errada */
    routerRedirectError,
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MercadoLivreRoutingModule { }
