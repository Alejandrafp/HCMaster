import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TendenciasComponent } from './tendencias.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: TendenciasComponent }
	])],
	exports: [RouterModule]
})
export class TendenciasRoutingModule { }
