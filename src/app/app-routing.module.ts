import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VoluntariosListaComponent } from './voluntarios-lista/voluntarios-lista.component';
import { VoluntariosFormularioComponent } from './voluntarios-formulario/voluntarios-formulario.component';

const routes: Routes = [
  { path: '', redirectTo: '/lista', pathMatch: 'full' },
  { path: 'lista', component: VoluntariosListaComponent },
  { path: 'formulario', component: VoluntariosFormularioComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
