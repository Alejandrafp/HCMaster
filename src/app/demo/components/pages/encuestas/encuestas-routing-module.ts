import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EncuestasComponent } from './encuestas.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: EncuestasComponent }
	])],
	exports: [RouterModule]
})
export class EncuestasRoutingModule { }
