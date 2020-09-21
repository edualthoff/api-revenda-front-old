import { ItensListComponent } from './itens-list/itens-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItensComponent } from './itens.component';
import { ItensFormularioComponent } from './itens-formulario/itens-formulario.component';

const routes: Routes = [

  { path: '', component: ItensComponent, children: [
    {path: '', component: ItensListComponent, pathMatch: 'full'},
    {path: 'adicionar', component: ItensFormularioComponent },
    {path: 'atualizar/:id', component: ItensFormularioComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItensRoutingModule { }
