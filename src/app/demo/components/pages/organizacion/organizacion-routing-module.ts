import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OrganizacionComponent } from './organizacion.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: OrganizacionComponent }
	])],
	exports: [RouterModule]
})
export class OrganizacionRoutingModule { }
