import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InformeComponent } from './informe.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: InformeComponent }
	])],
	exports: [RouterModule]
})
export class InformeRoutingModule { }