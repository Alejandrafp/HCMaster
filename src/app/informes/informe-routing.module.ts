import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { informeComponent } from './pages/informe/informe.component';

const routes: Routes = [
  { path:'', component:informeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class informeRoutingModule { }
