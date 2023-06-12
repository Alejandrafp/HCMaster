import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraficasComponent } from './graficas/graficas.component';
import { GraficasRoutes } from './graficas.routing';
import { ChartModule } from 'primeng/chart';



@NgModule({
  declarations: [
    GraficasComponent
  ],
  imports: [
    GraficasRoutes,
    CommonModule,
    ChartModule
  ],
})
export class GraficasModule { }
