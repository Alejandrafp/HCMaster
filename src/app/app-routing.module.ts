import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VoluntariosComponent } from './voluntarios/voluntarios.component';

const routes: Routes = [
  { path: 'voluntarios', component: VoluntariosComponent },
  { path: '', redirectTo: '/voluntarios', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
