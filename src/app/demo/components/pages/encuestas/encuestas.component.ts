import { Component,OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Encuestas } from 'src/app/demo/api/encuestas';
import { EncuestasService } from 'src/app/demo/service/encuestas.service';

@Component({
  selector: 'encuestas',
  templateUrl: './encuestas.component.html',
  providers: [MessageService]
})
export class EncuestasComponent {
    encuestaDialog: boolean = false;

    deleteEncuestaDialog: boolean = false;

    deleteEncuestasDialog: boolean = false;

    encuestas: Encuestas[] = [];

    encuesta: Encuestas = {};

    selectedEncuestas: Encuestas[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(private api: EncuestasService, private messageService: MessageService) { }

    ngOnInit() {
        //this.marketingService.getMarketings().then(data => this.marketings = data);

        this.api.getEncuestas().subscribe((data) => {

          this.encuestas = data.map((item) => {
              return {
                  id: item.id,
                  opinion: item.opinion,
                  customerId: item.clienteId,
                  suggestions: item.sugerencias,
                  complaints: item.quejas,
                  date: item.fecha
              }
          });
      })

    }

    openNew() {
        this.encuesta = {};
        this.submitted = false;
        this.encuestaDialog = true;
    }

    async deleteSelectedEncuestas() {
        this.deleteEncuestasDialog = true;
    }

    editEncuestas(encuesta: Encuestas) {
        this.encuesta = { ...encuesta };
        this.encuestaDialog = true;
    }

    async deleteEncuestas(encuesta: Encuestas) {
        this.deleteEncuestaDialog = true;
        // this.marketing = { ...marketing };    
    }

    confirmDeleteSelected() {
        this.deleteEncuestasDialog = false;
        this.encuestas = this.encuestas.filter(val => !this.selectedEncuestas.includes(val));
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'marketings Deleted', life: 3000 });
        this.selectedEncuestas = [];
    }

    confirmDelete(encuesta: Encuestas) {
      this.deleteEncuestasDialog = false;
      // this.organizacion = {};

      if (encuesta.id !== undefined) {
          this.api.deleteEncuestas(encuesta.id).subscribe((data) => {
              this.encuestas = this.encuestas.filter(val => val.id !== this.encuesta.id);
              this.messageService.add({ severity: 'success', summary: 'Elimnado con Éxito', detail: 'Eliminado', life: 3000 });
          })
      }
    }

    hideDialog() {
        this.encuestaDialog = false;
        this.submitted = false;
    }

    saveMarketing() {
        this.submitted = true;

        if (this.encuesta.opinion?.trim()) {

          if (this.encuesta.id) {
              this.api.editEncuestas(this.encuesta).subscribe((data) => {
                  const index = this.encuestas.findIndex((user) => (user.id === this.encuesta.id));
                  this.encuestas[index] = this.encuesta;
                  this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Organización actualizado', life: 3000 });
                  
                  this.encuestas = [...this.encuestas];
                  this.encuestaDialog = false;
                  this.encuesta = {};
              })
          } else {
              this.api.addEncuestas(this.encuesta).subscribe((data) => {
                  this.encuestas.push(this.encuesta);
                  this.messageService.add({ severity: 'success', summary: 'Creado con Éxito', detail: 'Organización creada', life: 3000 });


                  this.encuestas = [...this.encuestas];
                  this.encuestaDialog = false;
                  this.encuesta = {};
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
