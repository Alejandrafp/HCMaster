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

    deleteOrganizacionsDialog: boolean = false;

    organizacions: Organizacion[] = [];

    organizacion: Organizacion = {};

    selectedOrganizacions: Organizacion[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(private organizacionService: OrganizacionService, private messageService: MessageService) { }

    ngOnInit() {
        this.organizacionService.getOrganizacion().then(data => this.organizacions = data);

        this.cols = [
            { field: 'name', header: 'Nombre' },
            { field: 'address', header: 'Dirección' },
            { field: 'email', header: 'Correo' },
            { field: 'phone', header: 'Teléfono' },
            { field: 'description', header: 'Descripcion' }
        ];
    }

    openNew() {
        this.organizacion = {};
        this.submitted = false;
        this.organizacionDialog = true;
    }

    deleteSelectedOrganizacions() {
        this.deleteOrganizacionsDialog = true;
    }

    editOrganizacion(organizacion: Organizacion) {
        this.organizacion = { ...organizacion };
        this.organizacionDialog = true;
    }

    deleteOrganizacion(organizacion: Organizacion) {
        this.deleteOrganizacionDialog = true;
        this.organizacion = { ...organizacion };
    }

    confirmDeleteSelected() {
        this.deleteOrganizacionsDialog = false;
        this.organizacions = this.organizacions.filter(val => !this.selectedOrganizacions.includes(val));
        this.messageService.add({ severity: 'success', summary: 'Se ha eliminado', detail: 'Eliminado', life: 3000 });
        this.selectedOrganizacions = [];
    }

    confirmDelete() {
        this.deleteOrganizacionDialog = false;
        this.organizacions = this.organizacions.filter(val => val.id !== this.organizacion.id);
        this.messageService.add({ severity: 'success', summary: 'Elimnado con Éxito', detail: 'Eliminado', life: 3000 });
        this.organizacion = {};
    }

    hideDialog() {
        this.organizacionDialog = false;
        this.submitted = false;
    }

    saveOrganizacion() {
        this.submitted = true;

        if (this.organizacion.name?.trim()) {
            if (this.organizacion.id) {
                // @ts-ignore
                // this.product.inventoryStatus = this.product.inventoryStatus.value ? this.product.inventoryStatus.value : this.product.inventoryStatus;
                this.organizacions[this.findIndexById(this.organizacion.id)] = this.organizacion;
                this.messageService.add({ severity: 'success', summary: 'Actualizado con Éxito', detail: 'Actualizada', life: 3000 });
            } else {
                this.organizacion.id = this.createId();
                // @ts-ignore
                // this.product.inventoryStatus = this.product.inventoryStatus ? this.product.inventoryStatus.value : 'INSTOCK';
                this.organizacions.push(this.organizacion);
                this.messageService.add({ severity: 'success', summary: 'Creado con Éxito', detail: 'Organización creada', life: 3000 });
            }

            this.organizacions = [...this.organizacions];
            this.organizacionDialog = false;
            this.organizacion = {};
        }
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.organizacions.length; i++) {
            if (this.organizacions[i].id === id) {
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
