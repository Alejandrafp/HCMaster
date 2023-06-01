import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DonacionesListComponent } from './donaciones-list/donaciones-list.component';
import { DonacionesDetailComponent } from './donaciones-detail/donaciones-detail.component';
import { DonacionesCreateComponent } from './donaciones-create/donaciones-create.component';
import { DonacionesEditComponent } from './donaciones-edit/donaciones-edit.component';

const routes: Routes = [
  { path: '', redirectTo: 'donaciones', pathMatch: 'full' },
  { path: 'donaciones', component: DonacionesListComponent },
  { path: 'donaciones/:id', component: DonacionesDetailComponent },
  { path: 'create', component: DonacionesCreateComponent },
  { path: 'edit/:id', component: DonacionesEditComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
