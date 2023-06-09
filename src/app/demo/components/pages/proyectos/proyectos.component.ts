import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table/table';
import { Proyectos } from 'src/app/demo/api/proyectos';
import { ProyectosService } from 'src/app/demo/service/proyectos.service';

@Component({
  templateUrl: './proyectos.component.html',
  providers: [MessageService]
})
export class ProyectosComponent implements OnInit {
  
    proyectosDialog: boolean = false;

    deleteProyectoDialog: boolean = false;

    deleteProyectosDialog: boolean = false;

    proyectos: Proyectos[] = [];

    proyecto: Proyectos = {};

    selectedProyectos: Proyectos[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(private api: ProyectosService, private messageService: MessageService) { }

    async ngOnInit() {

        this.api.getProyectos().subscribe((data) => {

            this.proyectos = data.map((item) => {
                return {
                    id: item.id,
                    title: item.titulo,
                    location: item.ubicacion,
                    category: item.categoria,
                    startDate: item.fechaInicio,
                    endDate: item.fechaFinalizacion,
                    budget: item.presupuesto,
                    organizationID: item.organizacionId,
                    organization: item.organizacion,
                    organizationName: item.organizacionNombre
                }
            });
        })
    }

    openNew() {
        this.proyecto = {};
        this.submitted = false;
        this.proyectosDialog = true;
    }

    async deleteSelectedProyectos() {
        this.deleteProyectosDialog = true;
    }

    editProyectos(proyecto: Proyectos) {
        this.proyecto = { ...proyecto };
        this.proyectosDialog = true;
    }

    async deleteProyectos(proyecto: Proyectos) {
        this.deleteProyectosDialog = true;
        // this.organizacion = { ...organizacion };
    }

    confirmDeleteSelected() {
        this.deleteProyectosDialog = false;
        this.proyectos = this.proyectos.filter(val => !this.selectedProyectos.includes(val));
        this.messageService.add({ severity: 'success', summary: 'Se ha eliminado', detail: 'Eliminado', life: 3000 });
        this.selectedProyectos = [];
    }

    confirmDelete(proyecto: Proyectos) {
        this.deleteProyectosDialog = false;
        // this.organizacion = {};

        if (proyecto.id !== undefined) {
            this.api.deleteProyectos(proyecto.id).subscribe((data) => {
                this.proyectos = this.proyectos.filter(val => val.id !== this.proyecto.id);
                this.messageService.add({ severity: 'success', summary: 'Elimnado con Éxito', detail: 'Eliminado', life: 3000 });
            })
        }
    }

    hideDialog() {
        this.proyectosDialog = false;
        this.submitted = false;
    }

    saveProyectos() {
        this.submitted = true;

        if (this.proyecto.title?.trim()) {

            if (this.proyecto.id) {
                this.api.editProyectos(this.proyecto).subscribe((data) => {
                    // console.log(data, 'áquii');
                    const index = this.proyectos.findIndex((user) => (user.id === this.proyecto.id));
                    this.proyectos[index] = this.proyecto;
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Organización actualizado', life: 3000 });
                    
                    this.proyectos = [...this.proyectos];
                    this.proyectosDialog = false;
                    this.proyecto = {};
                })
            } else {
                this.api.addProyectos(this.proyecto).subscribe((data) => {
                    this.proyectos.push(this.proyecto);
                    this.messageService.add({ severity: 'success', summary: 'Creado con Éxito', detail: 'Organización creada', life: 3000 });


                    this.proyectos = [...this.proyectos];
                    this.proyectosDialog = false;
                    this.proyecto = {};
                })
            }
        }
    }

        findIndexById(id: number): number {
            let index = -1;
            for (let i = 0; i < this.proyectos.length; i++) {
                if (this.proyectos[i].id === id) {
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
