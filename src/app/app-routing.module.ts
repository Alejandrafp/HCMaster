import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DonacionesListaComponent } from './donaciones-lista/donaciones-lista.component';
import { DonacionesFormularioComponent } from './donaciones-formulario/donaciones-formulario.component';

const routes: Routes = [
  { path: '', redirectTo: '/donaciones', pathMatch: 'full' },
  { path: 'donaciones', component: DonacionesListaComponent },
  { path: 'donaciones/nueva', component: DonacionesFormularioComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
