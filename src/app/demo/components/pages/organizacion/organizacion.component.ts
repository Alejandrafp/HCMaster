import { Component, OnInit } from '@angular/core';
import { Organizacion } from 'src/app/demo/api/organizacion';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { OrganizacionService } from 'src/app/demo/service/organizacion.service';

@Component({
    templateUrl: './organizacion.component.html',
    providers: [MessageService]
})
export class OrganizacionComponent implements OnInit {

    organizacionDialog: boolean = false;

    deleteOrganizacionDialog: boolean = false;

    deleteOrganizacionesDialog: boolean = false;

    organizaciones: Organizacion[] = [];

    organizacion: Organizacion = {};

    selectedOrganizacions: Organizacion[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(private api: OrganizacionService, private messageService: MessageService) { }

    async ngOnInit() {

        this.api.getOrganizaciones().subscribe((data) => {

            this.organizaciones = data.map((item) => {
                return {
                    id: item.id,
                    name: item.nombre,
                    address: item.direccion,
                    email: item.correoElectronico,
                    phone: item.telefono,
                    description: item.descripcion,
                }
            });
        })
    }

    openNew() {
        this.organizacion = {};
        this.submitted = false;
        this.organizacionDialog = true;
    }

    async deleteSelectedOrganizaciones() {
        this.deleteOrganizacionesDialog = true;
    }

    editOrganizacion(organizacion: Organizacion) {
        this.organizacion = { ...organizacion };
        this.organizacionDialog = true;
    }

    async deleteOrganizacion(organizacion: Organizacion) {
        this.deleteOrganizacionDialog = true;
        // this.organizacion = { ...organizacion };
    }

    confirmDeleteSelected() {
        this.deleteOrganizacionesDialog = false;
        this.organizaciones = this.organizaciones.filter(val => !this.selectedOrganizacions.includes(val));
        this.messageService.add({ severity: 'success', summary: 'Se ha eliminado', detail: 'Eliminado', life: 3000 });
        this.selectedOrganizacions = [];
    }

    confirmDelete(organizacion: Organizacion) {
        this.deleteOrganizacionDialog = false;
        // this.organizacion = {};

        if (organizacion.id !== undefined) {
            this.api.deleteOrganizaciones(organizacion.id).subscribe((data) => {
                this.organizaciones = this.organizaciones.filter(val => val.id !== this.organizacion.id);
                this.messageService.add({ severity: 'success', summary: 'Elimnado con Éxito', detail: 'Eliminado', life: 3000 });
            })
        }
    }

    hideDialog() {
        this.organizacionDialog = false;
        this.submitted = false;
    }

    saveOrganizacion() {
        this.submitted = true;

        if (this.organizacion.name?.trim()) {

            if (this.organizacion.id) {
                this.api.editOrganizacion(this.organizacion).subscribe((data) => {
                    const index = this.organizaciones.findIndex((user) => (user.id === this.organizacion.id));
                    this.organizaciones[index] = this.organizacion;
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Organización actualizado', life: 3000 });
                    
                    this.organizaciones = [...this.organizaciones];
                    this.organizacionDialog = false;
                    this.organizacion = {};
                })
            } else {
                this.api.addOrganizaciones(this.organizacion).subscribe((data) => {
                    this.organizaciones.push(this.organizacion);
                    this.messageService.add({ severity: 'success', summary: 'Creado con Éxito', detail: 'Organización creada', life: 3000 });


                    this.organizaciones = [...this.organizaciones];
                    this.organizacionDialog = false;
                    this.organizacion = {};
                })
            }
        }
    }

        findIndexById(id: number): number {
            let index = -1;
            for (let i = 0; i < this.organizaciones.length; i++) {
                if (this.organizaciones[i].id === id) {
                    index = i;
                    break;
                }
            }

            return index;
        }

        createId(): string {
            let id = '';
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            for (let i = 0; i < 5; i++) {
                id += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            return id;
        }

        onGlobalFilter(table: Table, event: Event) {
            table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
        }
    }
