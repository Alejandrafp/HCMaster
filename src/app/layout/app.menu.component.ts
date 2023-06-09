import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Inicio',
                items: [
                    { label: 'Bienvenido', icon: 'pi pi-fw pi-home', routerLink: ['/'] }
                ]
            },
            {
                label: 'Herramientas',
                icon: 'pi pi-fw pi-briefcase',
                items: [
                    // {
                    //     label: 'Auth',
                    //     icon: 'pi pi-fw pi-user',
                    //     // items: [
                    //     //     {
                    //     //         label: 'Login',
                    //     //         icon: 'pi pi-fw pi-sign-in',
                    //     //         routerLink: ['/auth/login']
                    //     //     },
                    //     //     {
                    //     //         label: 'Access Denied',
                    //     //         icon: 'pi pi-fw pi-lock',
                    //     //         routerLink: ['/auth/access']
                    //     //     }
                    //     // ]
                    // },
                    {
                        label: 'Usuario',
                        icon: 'pi pi-user-plus',
                        routerLink: ['/pages/usuario']
                    },
                    {
                        label: 'Organización',
                        icon: 'pi pi-sitemap',
                        routerLink: ['/pages/organizacion']
                    },
                    {
                        label: 'Proyectos',
                        icon: 'pi pi-folder-open',
                        routerLink: ['/pages/proyectos']
                    },

                    {
                        label: 'Voluntario',
                        icon: 'pi pi-wrench',
                        routerLink: ['/pages/voluntarios']
                       },

                    {
                        label: 'Marketing',
                        icon: 'pi pi-chart-bar',
                        routerLink: ['/pages/marketing']
                    },
                    {
                        label: 'Clientes',
                        icon: 'pi pi-id-card',
                        routerLink: ['/pages/clientes']
                    },
                    {
                        label: 'Competencias',
                        icon: 'pi pi-chart-line',
                        routerLink: ['/pages/competencias']

                    },
                    {
                        label: 'Donaciones',
                        icon: 'pi pi-wrench',
                        routerLink: ['/pages/donaciones']
                    },
                    {

                        label: 'Actividades de Voluntarios',
                        icon: 'pi pi-wrench',
                        routerLink: ['/pages/actividades-voluntariados']
                    },
                    {
                        label: 'Encuestas',
                        icon: 'pi pi-send',
                        routerLink: ['/pages/encuestas']
                    },
                    {
                        label: 'Tendencias',
                        icon: 'pi pi-sort-alt',
                        routerLink: ['/pages/tendencias']
                    },
                    {
                        label: 'Graficas',
                        icon: 'pi pi-chart-pie',
                        routerLink: ['/pages/graficas']
                    },

                ]
            }
        ];
    }
}
