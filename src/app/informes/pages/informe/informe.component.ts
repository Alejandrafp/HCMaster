import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table/table';
import { informe } from '../../api/informe';
import { informeService } from '../../Service/informe.service';


@Component({
  selector: 'app-informe',
  templateUrl: './informe.component.html',
  styleUrls: ['./informe.component.scss']
})
export class informeComponent implements OnInit {
  informeDialog: boolean = false;

    deleteinformeDialog: boolean = false;

    deleteinformesDialog: boolean = false;

    informes: informe[] = [];

    informe: informe = {};

    selectedinformes: informe[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(private informeService: informeService, private messageService: MessageService) { }

    ngOnInit() {
        this.informeService.getinformes().then(data => this.informes = data);

        this.cols = [
            { field: 'id', header: 'Id' },
            { field: 'proyectoid', header: 'Proyectoid' },
            { field: 'usuariosid', header: 'Usuariosid' },
            { field: 'donaciones', header: 'Donaciones' },
            { field: 'horas', header: 'Horas' },
          
        ];

    }

    openNew() {
        this.informe = {};
        this.submitted = false;
        this.informeDialog = true;
    }

    deleteSelectedinformes() {
        this.deleteinformesDialog = true;
    }

    editinforme(informe: informe) {
        this.informe = { ...informe };
        this.informeDialog = true;
    }

    deleteinforme(informe: informe) {
        this.deleteinformeDialog = true;
        this.informe = { ...informe };
    }

    confirmDeleteSelected() {
        this.deleteinformesDialog = false;
        this.informes = this.informes.filter(val => !this.selectedinformes.includes(val));
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'informes Deleted', life: 3000 });
        this.selectedinformes = [];
    }

    confirmDelete() {
        this.deleteinformeDialog = false;
        this.informes = this.informes.filter(val => val.id !== this.informe.id);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'informe Deleted', life: 3000 });
        this.informe = {};
    }

    hideDialog() {
        this.informeDialog = false;
        this.submitted = false;
    }

    saveinforme() {
        this.submitted = true;

        if (this.informe.proyectoid?.trim()) {
            if (this.informe.id) {
                // @ts-ignore
                //this.informe.inventoryStatus = this.informe.inventoryStatus.value ? this.informe.inventoryStatus.value : this.informe.inventoryStatus;
                this.informes[this.findIndexById(this.informe.id)] = this.informe;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'informe Updated', life: 3000 });
            } else {
                this.informe.id = this.createId();
                //this.informe.code = this.createId();
                //this.informe.image = 'informe-placeholder.svg';
                // @ts-ignore
                //this.informe.inventoryStatus = this.informe.inventoryStatus ? this.informe.inventoryStatus.value : 'INSTOCK';
                this.informes.push(this.informe);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'informe Created', life: 3000 });
            }

            this.informes = [...this.informes];
            this.informeDialog = false;
            this.informe = {};
        }
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.informes.length; i++) {
            if (this.informes[i].id === id) {
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
