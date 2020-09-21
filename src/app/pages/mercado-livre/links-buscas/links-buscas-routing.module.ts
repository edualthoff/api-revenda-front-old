import { LinksListComponent } from './links-list/links-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LinksBuscasComponent } from './links-buscas.component';
import { LinksFormularioComponent } from './links-formulario/links-formulario.component';

const routes: Routes = [{ path: '', component: LinksBuscasComponent, children: [
    { path: '', component: LinksListComponent, pathMatch: 'full' },
    { path: 'adicionar', component: LinksFormularioComponent },
    { path: 'atualizar/:id', component: LinksFormularioComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LinksBuscasRoutingModule { }
