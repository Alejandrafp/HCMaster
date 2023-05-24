import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { clientesComponent } from './pages/clientes/clientes.component';

const routes: Routes = [
  { path:'', component:clientesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class clientesRoutingModule { }
