import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table/table';
import { clientes } from '../../api/clientes';
import { clientesService } from '../../Service/clientes.service';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class clientesComponent implements OnInit {
  clientesDialog: boolean = false;

    deleteclientesDialog: boolean = false;

    deleteclientessDialog: boolean = false;

    clientess: clientes[] = [];

    clientes: clientes = {};

    selectedclientess: clientes[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(private clientesService: clientesService, private messageService: MessageService) { }

    ngOnInit() {
        this.clientesService.getclientess().then(data => this.clientess = data);

        this.cols = [
            { field: 'id', header: 'Id' },
            { field: 'nombre', header: 'nombre' },
            { field: 'genero', header: 'genero' },
            { field: 'ubicacion', header: 'ubicacion' },
            { field: 'edad', header: 'edad' },
            { field: 'preferencias', header: 'preferencias' },
            { field: 'comportamiento', header: 'comportamiento' },
          
        ];

    }

    openNew() {
        this.clientes = {};
        this.submitted = false;
        this.clientesDialog = true;
    }

    deleteSelectedclientess() {
        this.deleteclientessDialog = true;
    }

    editclientes(clientes: clientes) {
        this.clientes = { ...clientes };
        this.clientesDialog = true;
    }

    deleteclientes(clientes: clientes) {
        this.deleteclientesDialog = true;
        this.clientes = { ...clientes };
    }

    confirmDeleteSelected() {
        this.deleteclientessDialog = false;
        this.clientess = this.clientess.filter(val => !this.selectedclientess.includes(val));
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'clientess Deleted', life: 3000 });
        this.selectedclientess = [];
    }

    confirmDelete() {
        this.deleteclientesDialog = false;
        this.clientess = this.clientess.filter(val => val.id !== this.clientes.id);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'clientes Deleted', life: 3000 });
        this.clientes = {};
    }

    hideDialog() {
        this.clientesDialog = false;
        this.submitted = false;
    }

    saveclientes() {
        this.submitted = true;

        if (this.clientes.nombre?.trim()) {
            if (this.clientes.id) {
                // @ts-ignore
                //this.clientes.inventoryStatus = this.clientes.inventoryStatus.value ? this.clientes.inventoryStatus.value : this.clientes.inventoryStatus;
                this.clientess[this.findIndexById(this.clientes.id)] = this.clientes;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'clientes Updated', life: 3000 });
            } else {
                this.clientes.id = this.createId();
                //this.clientes.code = this.createId();
                //this.clientes.image = 'clientes-placeholder.svg';
                // @ts-ignore
                //this.clientes.inventoryStatus = this.clientes.inventoryStatus ? this.clientes.inventoryStatus.value : 'INSTOCK';
                this.clientess.push(this.clientes);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'clientes Created', life: 3000 });
            }

            this.clientess = [...this.clientess];
            this.clientesDialog = false;
            this.clientes = {};
        }
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.clientess.length; i++) {
            if (this.clientess[i].id === id) {
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
