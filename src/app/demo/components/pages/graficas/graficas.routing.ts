import { Routes, RouterModule } from '@angular/router';
import { GraficasComponent } from './graficas/graficas.component';

const routes: Routes = [
    { path: '', component: GraficasComponent }
];

export const GraficasRoutes = RouterModule.forChild(routes);
