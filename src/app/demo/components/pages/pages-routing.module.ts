import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'crud', loadChildren: () => import('./crud/crud.module').then(m => m.CrudModule) },
        { path: 'organizacion', loadChildren: () => import('./organizacion/organizacion.module').then(m => m.OrganizacionModule) },
        { path: 'proyectos', loadChildren: () => import('./proyectos/proyectos.module').then(m => m.ProyectosModule) },
        { path: 'usuario', loadChildren: () => import('./usuario/usuario.module').then(m => m.UsuarioModule) },
        { path: 'marketing', loadChildren: () => import('./marketing/marketing.module').then(m => m.MarketingModule) },
        { path: 'clientes', loadChildren: () => import('./clientes/clientes.module').then(m => m.ClientesModule) },
        { path: 'competencias', loadChildren: () => import('./competencias/competencias.module').then(m => m.CompetenciasModule) },
        { path: 'donaciones', loadChildren: () => import('./donaciones/donaciones.module').then(m => m.DonacionesModule) },
        { path: 'encuestas', loadChildren: () => import('./encuestas/encuestas.module').then(m => m.EncuestasModule) },
        { path: 'tendencias', loadChildren: () => import('./tendencias/tendencias.module').then(m => m.TendenciasModule) },
        { path: 'graficas', loadChildren: () => import('./graficas/graficas.module').then(m => m.GraficasModule) },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
