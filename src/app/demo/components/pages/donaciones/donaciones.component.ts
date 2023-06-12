
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table/table';
import {Donaciones } from 'src/app/demo/api/donaciones';
import { DonacionesService } from 'src/app/demo/service/donaciones.service';


@Component({
  templateUrl: './donaciones.component.html',
  providers: [MessageService]
})
export class DonacionesComponent implements OnInit {
  
    donaDialog: boolean = false;


    deleteDonacionesDialog: boolean = false;

    deleteDonacioneDialog: boolean = false;

    donas:Donaciones [] = [];

    dona: Donaciones = {};


    selectedDonaciones: Donaciones[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(private api: DonacionesService, private messageService: MessageService) { }


    async ngOnInit() {

        this.api.getDonaciones().subscribe((data) => {

            this.donas = data.map((item) => {
                return {
                    id: item.id,
                    donanteNombre: item.donanteNombre,
                    cantidadDonada: item.cantidadDonada,
                    fecha: item.fecha,  
                    proyectoId: item.proyectoId 
                   
                }
            });
        })
    }

    openNew() {
        this.dona = {};
        this.submitted = false;
        this.donaDialog = true;

    }

    async deleteSelectedDonaciones() {
        this.deleteDonacionesDialog = true;
    }


    editDonaciones(dona: Donaciones) {
        this.dona = { ...dona };
        this.donaDialog = true;
    }

    async deleteDonaciones(dona: Donaciones) {
        this.deleteDonacionesDialog = true;
     

    }

    showDate(date?: Date) {
        if(!date) return '';
        return new Date(date).toLocaleDateString();
    }

    confirmDeleteSelected() {
        this.deleteDonacionesDialog = false;

        this.donas = this.donas.filter(val => !this.selectedDonaciones.includes(val));
        this.messageService.add({ severity: 'success', summary: 'Se ha eliminado', detail: 'Eliminado', life: 3000 });
        this.selectedDonaciones = [];
    }

    confirmDelete(dona: Donaciones) {
        this.deleteDonacionesDialog = false;
        // this.organizacion = {};


        if (dona.id !== undefined) {
            this.api.deleteDonaciones(dona.id).subscribe((data) => {
                this.donas = this.donas.filter(val => val.id !== this.dona.id);
                this.messageService.add({ severity: 'success', summary: 'Elimnado con Éxito', detail: 'Eliminado', life: 3000 });
            })
        }

    }

    hideDialog() {
        this.donaDialog = false;
        this.submitted = false;
    }

    saveDonaciones() {
        this.submitted = true;


        if (this.dona.donanteNombre?.trim()) {

            if (this.dona.id) {
                this.api.editDonaciones(this.dona).subscribe((data) => {
                    const index = this.donas.findIndex((user) => (user.id === this.dona.id));
                    this.donas[index] = this.dona;
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Organización actualizado', life: 3000 });
                    
                    this.donas = [...this.donas];
                    this.donaDialog = false;
                    this.dona = {};
                })
            } else {
                this.api.addDonaciones(this.dona).subscribe((data) => {
                    this.donas.push(this.dona);
                    this.messageService.add({ severity: 'success', summary: 'Creado con Éxito', detail: 'Donación creada', life: 3000 });


                    this.donas = [...this.donas];
                    this.donaDialog = false;
                    this.dona = {};
                })
            }
        }
    }


        findIndexById(id: number): number {
            let index = -1;
            for (let i = 0; i < this.donas.length; i++) {
                if (this.donas[i].id === id) {
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

