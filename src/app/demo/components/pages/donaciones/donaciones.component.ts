import { Component,OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Donaciones } from 'src/app/demo/api/donaciones';
import { DonacionesService } from 'src/app/demo/service/donaciones.service';

@Component({
  selector: 'donaciones',
  templateUrl: './donaciones.component.html',
  providers: [MessageService]
})
export class DonacionesComponent implements OnInit{
   donacionesDialog: boolean = false;

    deleteDonacionesDialog: boolean = false;

    deleteDonacioneDialog: boolean = false;

    donaciones: Donaciones[] = [];

    donacione: Donaciones = {};

    selectedDonaciones: Donaciones[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(private api: DonacionesService, private messageService: MessageService) { }

    ngOnInit() {

        this.api.getDonaciones().subscribe((data) => {

          this.donaciones = data.map((item) => {
              return {
                  id: item.id,
                  nameDonor: item.donanteNombre,
                  quantityDonnor: item.cantidadDonada,
                  date: item.fecha,
                  projectId: item.proyectoId
              }
          });
      })

    }

    openNew() {
        this.donacione = {};
        this.submitted = false;
        this.donacionesDialog = true;
    }

    async deleteSelectedDonaciones() {
        this.deleteDonacionesDialog = true;
    }

    editDonaciones(donacione: Donaciones) {
        this.donacione = { ...donacione };
        this.donacionesDialog = true;
    }

    async deleteDonaciones(donacione: Donaciones) {
        this.deleteDonacionesDialog = true;   
    }

    confirmDeleteSelected() {
        this.deleteDonacionesDialog = false;
        this.donaciones = this.donaciones.filter(val => !this.selectedDonaciones.includes(val));
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'marketings Deleted', life: 3000 });
        this.selectedDonaciones = [];
    }

    confirmDelete(donacione: Donaciones) {
      this.deleteDonacionesDialog = false;
      // this.organizacion = {};

      if (donacione.id !== undefined) {
          this.api.deleteDonaciones(donacione.id).subscribe((data) => {
              this.donaciones = this.donaciones.filter(val => val.id !== this.donacione.id);
              this.messageService.add({ severity: 'success', summary: 'Elimnado con Éxito', detail: 'Eliminado', life: 3000 });
          })
      }
    }

    hideDialog() {
        this.donacionesDialog = false;
        this.submitted = false;
    }

    saveDonaciones() {
        this.submitted = true;

        if (this.donacione.nameDonor?.trim()) {

          if (this.donacione.id) {
              this.api.editDonaciones(this.donacione).subscribe((data) => {
                  const index = this.donaciones.findIndex((user) => (user.id === this.donacione.id));
                  this.donaciones[index] = this.donacione;
                  this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Organización actualizado', life: 3000 });
                  
                  this.donaciones = [...this.donaciones];
                  this.donacionesDialog = false;
                  this.donacione = {};
              })
          } else {
              this.api.addDonaciones(this.donacione).subscribe((data) => {
                  this.donaciones.push(this.donacione);
                  this.messageService.add({ severity: 'success', summary: 'Creado con Éxito', detail: 'Organización creada', life: 3000 });


                  this.donaciones = [...this.donaciones];
                  this.donacionesDialog = false;
                  this.donacione = {};
              })
          }
      }
    }

    findIndexById(id: number): number {
        let index = -1;
        /*for (let i = 0; i < this.marketings.length; i++) {
            if (this.marketings[i].id === id) {
                index = i;
                break;
            }
        }*/

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
