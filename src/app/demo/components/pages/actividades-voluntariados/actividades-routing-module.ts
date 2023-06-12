import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ActividadesVoluntariadoComponent } from './actividades-voluntariados.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: ActividadesVoluntariadoComponent }
	])],
	exports: [RouterModule]
})
export class ActividadesVoluntariadoRoutingModule { }
