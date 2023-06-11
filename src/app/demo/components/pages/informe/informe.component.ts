import { Component,OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Informe } from 'src/app/demo/api/informe';
import { InformeService } from 'src/app/demo/service/informe.service';

@Component({
  selector: 'app-informe',
  templateUrl: './informe.component.html'
})
export class InformeComponent {
    informeDialog: boolean = false;

    deleteInformeDialog: boolean = false;

    deleteInformesDialog: boolean = false;

    informes: Informe[] = [];

    informe: Informe = {};

    selectedInforme: Informe[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(private api: InformeService, private messageService: MessageService) { }

    ngOnInit() {
        //this.marketingService.getMarketings().then(data => this.marketings = data);

        this.api.getInforme().subscribe((data) => {

          this.informes = data.map((item) => {
              return {
                  id: item.id,
                  channel: item.canal,
              }
          });
      })

    }

    openNew() {
        this.informe = {};
        this.submitted = false;
        this.informeDialog = true;
    }

    async deleteSelectedInformes() {
        this.deleteInformeDialog = true;
    }

    editInforme(informe: Informe) {
        this.informe = { ...informe };
        this.informeDialog = true;
    }

    async deleteInforme(informe: Informe) {
        this.deleteInformeDialog = true;   
    }

    confirmDeleteSelected() {
        this.deleteInformeDialog = false;
        this.informes = this.informes.filter(val => !this.selectedInforme.includes(val));
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'marketings Deleted', life: 3000 });
        this.selectedInforme = [];
    }

    confirmDelete(informe: Informe) {
      this.deleteInformeDialog = false;
      // this.organizacion = {};

      if (informe.id !== undefined) {
          this.api.deleteInforme(informe.id).subscribe((data) => {
              this.informes = this.informes.filter(val => val.id !== this.informe.id);
              this.messageService.add({ severity: 'success', summary: 'Elimnado con Éxito', detail: 'Eliminado', life: 3000 });
          })
      }
    }

    hideDialog() {
        this.informeDialog = false;
        this.submitted = false;
    }

    saveInformes() {
        this.submitted = true;

          if (this.informe.id) {
              this.api.editInforme(this.informe).subscribe((data) => {
                  const index = this.informes.findIndex((user) => (user.id === this.informe.id));
                  this.informes[index] = this.informe;
                  this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Organización actualizado', life: 3000 });
                  
                  this.informes = [...this.informes];
                  this.informeDialog = false;
                  this.informe = {};
              })
          } else {
              this.api.addInforme(this.informe).subscribe((data) => {
                  this.informes.push({ ...this.informe, id: data.id });
                  this.messageService.add({ severity: 'success', summary: 'Creado con Éxito', detail: 'Organización creada', life: 3000 });


                  this.informes = [...this.informes];
                  this.informeDialog = false;
                  this.informe = {};
              })
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
