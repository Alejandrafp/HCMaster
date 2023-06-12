import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { VoluntariosComponent } from './voluntarios.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: VoluntariosComponent }
	])],
	exports: [RouterModule]
})
export class VoluntariosRoutingModule { }
