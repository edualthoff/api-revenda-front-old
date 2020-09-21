import { routerRedirectError } from './../../app-routing.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [{ path: '', children: [
    { path: 'categorias', loadChildren: () => import('./categorias/categorias.module').then(m => m.CategoriasModule) },
    { path: 'marcas', loadChildren: () => import('./marcas/marcas.module').then(m => m.MarcasModule) },
    { path: 'itens', loadChildren: () => import('./itens/itens.module').then(m => m.ItensModule) },
    /** link de retorno quando digitado URL errada */
    //routerRedirectError
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProdutosRoutingModule { }
