import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CompetenciasComponent } from './competencias.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: CompetenciasComponent }
	])],
	exports: [RouterModule]
})
export class CompetenciasRoutingModule { }
