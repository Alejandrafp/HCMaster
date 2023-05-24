import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table/table';
import { cliente } from '../../api/cliente';
import { clienteService } from '../../Service/cliente.service';


@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class clienteComponent implements OnInit {
  clienteDialog: boolean = false;

    deleteclienteDialog: boolean = false;

    deleteclientesDialog: boolean = false;

    clientes: cliente[] = [];

    cliente: cliente = {};

    selectedclientes: cliente[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(private clienteService: clienteService, private messageService: MessageService) { }

    ngOnInit() {
        this.clienteService.getclientess().then(data => this.clientes = data);

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
        this.cliente = {};
        this.submitted = false;
        this.clienteDialog = true;
    }

    deleteSelectedclientes() {
        this.deleteclientesDialog = true;
    }

    editcliente(cliente: cliente) {
        this.cliente = { ...cliente };
        this.clienteDialog = true;
    }

    deletecliente(cliente: cliente) {
        this.deleteclienteDialog = true;
        this.cliente = { ...cliente };
    }

    confirmDeleteSelected() {
        this.deleteclientesDialog = false;
        this.clientes = this.clientes.filter(val => !this.selectedclientes.includes(val));
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'clientes Deleted', life: 3000 });
        this.selectedclientes = [];
    }

    confirmDelete() {
        this.deleteclienteDialog = false;
        this.clientes = this.clientes.filter(val => val.id !== this.cliente.id);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'cliente Deleted', life: 3000 });
        this.cliente = {};
    }

    hideDialog() {
        this.clienteDialog = false;
        this.submitted = false;
    }

    savecliente() {
        this.submitted = true;

        if (this.cliente.nombre?.trim()) {
            if (this.cliente.id) {
                // @ts-ignore
                //this.cliente.inventoryStatus = this.cliente.inventoryStatus.value ? this.cliente.inventoryStatus.value : this.cliente.inventoryStatus;
                this.clientes[this.findIndexById(this.cliente.id)] = this.cliente;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'cliente Updated', life: 3000 });
            } else {
                this.cliente.id = this.createId();
                //this.cliente.code = this.createId();
                //this.cliente.image = 'cliente-placeholder.svg';
                // @ts-ignore
                //this.cliente.inventoryStatus = this.cliente.inventoryStatus ? this.cliente.inventoryStatus.value : 'INSTOCK';
                this.clientes.push(this.cliente);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'cliente Created', life: 3000 });
            }

            this.clientes = [...this.clientes];
            this.clienteDialog = false;
            this.cliente = {};
        }
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.clientes.length; i++) {
            if (this.clientes[i].id === id) {
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
