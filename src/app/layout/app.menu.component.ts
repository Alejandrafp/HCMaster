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
                    {
                        label: 'Auth',
                        icon: 'pi pi-fw pi-user',
                        items: [
                            {
                                label: 'Login',
                                icon: 'pi pi-fw pi-sign-in',
                                routerLink: ['/auth/login']
                            },
                            {
                                label: 'Access Denied',
                                icon: 'pi pi-fw pi-lock',
                                routerLink: ['/auth/access']
                            }
                        ]
                    },
                    {
                        label: 'Crud',
                        icon: 'pi pi-fw pi-pencil',
                        routerLink: ['/pages/crud']
                    },
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
                        icon: 'pi pi-wrench',
                        routerLink: ['/pages/proyectos']
                    },
                    {
                        label: 'Marketing',
                        icon: 'pi pi-wrench',
                        routerLink: ['/pages/marketing']
                    },
                    {
                        label: 'Clientes',
                        icon: 'pi pi-wrench',
                        routerLink: ['/pages/clientes']
                    },
                    {
                        label: 'Competencias',
                        icon: 'pi pi-wrench',
                        routerLink: ['/pages/competencias']
                    },
                    {
                        label: 'Donaciones',
                        icon: 'pi pi-wrench',
                        routerLink: ['/pages/donaciones']
                    },
                    {
                        label: 'Encuestas',
                        icon: 'pi pi-wrench',
                        routerLink: ['/pages/encuestas']
                    },
                    {
                        label: 'Tendencias',
                        icon: 'pi pi-wrench',
                        routerLink: ['/pages/tendencias']
                    },
                        
                ]
            }
        ];
    }
}
