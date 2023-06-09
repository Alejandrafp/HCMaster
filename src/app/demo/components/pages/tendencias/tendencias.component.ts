import { Component,OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Tendencias } from 'src/app/demo/api/tendencias';
import { TendenciasService } from 'src/app/demo/service/tendencias.service';

@Component({
  selector: 'tendencias',
  templateUrl: './tendencias.component.html',
  providers: [MessageService]
})
export class TendenciasComponent {
   tendenciasDialog: boolean = false;

    deleteTendenciaDialog: boolean = false;

    deleteTendenciasDialog: boolean = false;

    tendencias: Tendencias[] = [];

    tendencia: Tendencias = {};

    selectedTendencias: Tendencias[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(private api: TendenciasService, private messageService: MessageService) { }

    ngOnInit() {
        //this.marketingService.getMarketings().then(data => this.marketings = data);

        this.api.getTendencias().subscribe((data) => {

          this.tendencias = data.map((item) => {
              return {
                  id: item.id,
                  marketsize: item.tamanoMercado,
                  growth: item.crecimientoMercado,
                  opportunities: item.oportunidadesCrecimiento,
                  threats: item.amenazas,
                  competitionId: item.competenciaId
              }
          });
      })

    }

    openNew() {
        this.tendencia = {};
        this.submitted = false;
        this.tendenciasDialog = true;
    }

    async deleteSelectedTendencias() {
        this.deleteTendenciasDialog = true;
    }

    editTendencias(tendencia: Tendencias) {
        this.tendencia = { ...tendencia };
        this.tendenciasDialog = true;
    }

    async deleteTendencias(tendencia: Tendencias) {
        this.deleteTendenciasDialog = true;
        // this.marketing = { ...marketing };    
    }

    confirmDeleteSelected() {
        this.deleteTendenciasDialog = false;
        this.tendencias = this.tendencias.filter(val => !this.selectedTendencias.includes(val));
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'marketings Deleted', life: 3000 });
        this.selectedTendencias = [];
    }

    confirmDelete(tendencia: Tendencias) {
      this.deleteTendenciasDialog = false;
      // this.organizacion = {};

      if (tendencia.id !== undefined) {
          this.api.deleteTendencias(tendencia.id).subscribe((data) => {
              this.tendencias = this.tendencias.filter(val => val.id !== this.tendencia.id);
              this.messageService.add({ severity: 'success', summary: 'Elimnado con Éxito', detail: 'Eliminado', life: 3000 });
          })
      }
    }

    hideDialog() {
        this.tendenciasDialog = false;
        this.submitted = false;
    }

    saveTendencias() {
        this.submitted = true;

        if (this.tendencia.marketsize?.trim()) {

          if (this.tendencia.id) {
              this.api.editTendencias(this.tendencia).subscribe((data) => {
                  const index = this.tendencias.findIndex((user) => (user.id === this.tendencia.id));
                  this.tendencias[index] = this.tendencia;
                  this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Organización actualizado', life: 3000 });
                  
                  this.tendencias = [...this.tendencias];
                  this.tendenciasDialog = false;
                  this.tendencia = {};
              })
          } else {
              this.api.addTendencias(this.tendencia).subscribe((data) => {
                  this.tendencias.push(this.tendencia);
                  this.messageService.add({ severity: 'success', summary: 'Creado con Éxito', detail: 'Organización creada', life: 3000 });


                  this.tendencias = [...this.tendencias];
                  this.tendenciasDialog = false;
                  this.tendencia = {};
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
