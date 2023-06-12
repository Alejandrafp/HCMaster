import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table/table';
import { Voluntarios } from 'src/app/demo/api/voluntarios';
import { VoluntariosService } from 'src/app/demo/service/voluntarios.service';


@Component({
    templateUrl: './voluntarios.component.html',
    providers: [MessageService]
})
export class VoluntariosComponent implements OnInit {

    voluDialog: boolean = false;

    deleteVoluntariosDialog: boolean = false;

    deleteVoluntarioDialog: boolean = false;

    volus: Voluntarios[] = [];

    volu: Voluntarios = {};

    selectedVoluntario: Voluntarios[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(private api: VoluntariosService, private messageService: MessageService) { }

    async ngOnInit() {

        this.api.getVoluntarios().subscribe((data) => {

            this.volus = data.map((item) => {
                return {
                    id: item.id,
                    nombre: item.nombre,
                    apellido: item.apellido,
                    correoElectronico: item.correoElectronico,
                    descripcion: item.descripcion,
                    habilidades: item.habilidades,
                    actividadVoluntariadoId: item.actividadVoluntariadoId
                }
            });
        })
    }

    openNew() {
        this.volu = {};
        this.submitted = false;
        this.voluDialog = true;
    }

    async deleteSelectedVoluntarios() {
        this.deleteVoluntariosDialog = true;

    }

    editVoluntarios(volu: Voluntarios) {
        this.volu = { ...volu };
        this.voluDialog = true;
    }

    async deleteVoluntarios(volu: Voluntarios) {
        this.deleteVoluntariosDialog = true;
    }

    confirmDeleteSelected() {
        this.deleteVoluntariosDialog = false;
        this.volus = this.volus.filter(val => !this.selectedVoluntario.includes(val));
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Confirm', life: 3000 });
        this.selectedVoluntario = [];
    }

    confirmDelete(volu: Voluntarios) {
        this.deleteVoluntariosDialog = false;

        console.log(this.volu);


        if (volu.id !== undefined) {
            this.api.deleteVoluntarios(volu.id).subscribe((data) => {
                this.volus = this.volus.filter((item) => (item.id !== volu.id));
            })
        }
       
    }

    hideDialog() {
        this.voluDialog = false;
        this.submitted = false;
    }

    saveVoluntarios() {
        this.submitted = true;

        if (this.volu.nombre?.trim()) {
            if (this.volu.id) {
                this.api.editVoluntarios(this.volu).subscribe((data) => {
                    const index = this.volus.findIndex((user) => (user.id === this.volu.id));
                    this.volus[index] = this.volu;
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Voluntarios Updated', life: 3000 });

                    this.volus = [...this.volus];
                    this.voluDialog = false;
                    this.volu = {};
                })
            } else {
                this.api.addVoluntarios(this.volu).subscribe((data) => {
                    this.volus.push(this.volu);
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Voluntarios Created', life: 3000 });

                    this.volus = [...this.volus];
                    this.voluDialog = false;
                    this.volu = {};
                })
            }
        }
    }

    findIndexById(id: number): number {
        let index = -1;
        for (let i = 0; i < this.volus.length; i++) {
            if (this.volus[i].id === id) {
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
