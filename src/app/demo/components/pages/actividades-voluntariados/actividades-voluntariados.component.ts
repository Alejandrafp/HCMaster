
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table/table';
import { ActividadesVoluntariado } from 'src/app/demo/api/activivolun';
import { ActividadesVoluntariadoService } from 'src/app/demo/service/actividades.service';


@Component({
  templateUrl: './actividades-voluntariados.component.html',
  providers: [MessageService]
})
export class ActividadesVoluntariadoComponent implements OnInit {

    actiDialog: boolean = false;

    deleteActividadesVoluntariadoDialog: boolean = false;

    deleteActividadesVoluntariadosDialog: boolean = false;

    activ: ActividadesVoluntariado[] = [];

    acti: ActividadesVoluntariado = {};

    selectedActividadesVoluntariados: ActividadesVoluntariado[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(private api: ActividadesVoluntariadoService, private messageService: MessageService) { }

    async ngOnInit() {

        this.api.getActividadesVoluntariado().subscribe((data) => {

            this.activ = data.map((item) => {
                return {
                    id: item.id,
                    titulo: item.titulo,
                    descripcion: item.descripcion,
                    ubicacion: item.ubicacion,
                    fechaHora: item.fechaHora,
                    voluntariosRequeridos: item.voluntariosRequeridos ,
                    organizacionId: item.organizacionId

                }
            });
        })
    }

    openNew() {
        this.acti = {};
        this.submitted = false;
        this.actiDialog = true;
    }

    async deleteSelectedActividadesVoluntariado() {
        this.deleteActividadesVoluntariadoDialog = true;
    }

    editActividadesVoluntariado(acti: ActividadesVoluntariado) {
        this.acti = { ...acti };
        this.actiDialog = true;
    }

    async deleteActividadesVoluntariado(acti: ActividadesVoluntariado) {
        this.deleteActividadesVoluntariadoDialog = true;
        this.acti = { ...acti };
    }

    confirmDeleteSelected() {
        this.deleteActividadesVoluntariadoDialog = false;
        this.activ = this.activ.filter(val => !this.selectedActividadesVoluntariados.includes(val));
        this.messageService.add({ severity: 'success', summary: 'Se ha eliminado', detail: 'Eliminado', life: 3000 });
        this.selectedActividadesVoluntariados = [];
    }
    confirmDelete(acti: ActividadesVoluntariado) {
        this.deleteActividadesVoluntariadoDialog = false;

        console.log(this.acti);


        if (acti.id !== undefined) {
            this.api.deleteActividadesVoluntariado(acti.id).subscribe((data) => {
                this.activ = this.activ.filter((item) => (item.id !== acti.id));
            })
        }

    }


    hideDialog() {
        this.actiDialog = false;
        this.submitted = false;
    }

    saveActividadesVoluntariado() {
        this.submitted = true;

        if (this.acti.titulo?.trim()) {
            if (this.acti.id) {
                this.api.editActividadesVoluntariado(this.acti).subscribe((data) => {
                    const index = this.activ.findIndex((user) => (user.id === this.acti.id));
                    this.activ[index] = this.acti;
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Actividades actualizado', life: 3000 });

                    this.activ = [...this.activ];
                    this.actiDialog = false;
                    this.acti = {};
                })
            } else {
                this.api.addActividadesVoluntariado(this.acti).subscribe((data) => {
                    this.activ.push(this.acti);
                    this.messageService.add({ severity: 'success', summary: 'Creado con Éxito', detail: 'Actividad creada', life: 3000 });


                    this.activ = [...this.activ];
                    this.actiDialog = false;
                    this.acti = {};
                })
            }
        }
    }

        findIndexById(id: number): number {
            let index = -1;
            for (let i = 0; i < this.activ.length; i++) {
                if (this.activ[i].id === id) {
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

