import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MarketingComponent } from './marketing.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: MarketingComponent }
	])],
	exports: [RouterModule]
})
export class MarketingRoutingModule { }
