import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Competencias } from 'src/app/demo/api/competencias';
import { CompetenciasService } from 'src/app/demo/service/competencias.service';

@Component({
  selector: 'competencias',
  templateUrl: './competencias.component.html',
  providers: [MessageService]
})
export class CompetenciasComponent implements OnInit {
    competenciaDialog: boolean = false;

    deleteCompetenciaDialog: boolean = false;

    deleteCompetenciasDialog: boolean = false;

    competencias: Competencias[] = [];

    competencia: Competencias = {};

    selectedCompetencias: Competencias[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(private api: CompetenciasService, private messageService: MessageService) { }

    ngOnInit() {

        this.api.getCompetencias().subscribe((data) => {

          this.competencias = data.map((item) => {
              return {
                id: item.id,
                name: item.nombre,
                product: item.producto,
                strategies: item.estrategiasMarketing,
                analysisPrices: item.analisisPrecios,
                chanelId: item.canalMarketingId,
                channelMarketing: item.canalMarketing
              }
          });
      })

    }

    openNew() {
        this.competencia = {};
        this.submitted = false;
        this.competenciaDialog = true;
    }

    async deleteSelectedCompetencia() {
        this.deleteCompetenciasDialog = true;
    }

    editCompetencia(competencia: Competencias) {
        this.competencia = { ...competencia };
        this.competenciaDialog = true;
    }

    async deleteCompetencia(competencia: Competencias) {
        this.deleteCompetenciaDialog = true;
        // this.marketing = { ...marketing };    
    }

    confirmDeleteSelected() {
        this.deleteCompetenciasDialog = false;
        this.competencias = this.competencias.filter(val => !this.selectedCompetencias.includes(val));
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'marketings Deleted', life: 3000 });
        this.selectedCompetencias = [];
    }

    confirmDelete(competencia: Competencias) {
      this.deleteCompetenciasDialog = false;
      // this.organizacion = {};

      if (competencia.id !== undefined) {
          this.api.deleteCompetencias(competencia.id).subscribe((data) => {
              this.competencias = this.competencias.filter(val => val.id !== this.competencia.id);
              this.messageService.add({ severity: 'success', summary: 'Elimnado con Éxito', detail: 'Eliminado', life: 3000 });
          })
      }
    }

    hideDialog() {
        this.competenciaDialog = false;
        this.submitted = false;
    }

    saveCompetencias() {
        this.submitted = true;

        if (this.competencia.name?.trim()) {

          if (this.competencia.id) {
              this.api.editCompetencias(this.competencia).subscribe((data) => {
                  const index = this.competencias.findIndex((user) => (user.id === this.competencia.id));
                  this.competencias[index] = this.competencia;
                  this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Organización actualizado', life: 3000 });
                  
                  this.competencias = [...this.competencias];
                  this.competenciaDialog = false;
                  this.competencia = {};
              })
          } else {
              this.api.addCompetencias(this.competencia).subscribe((data) => {
                  this.competencias.push({ ...this.competencia, id: data.id });
                  this.messageService.add({ severity: 'success', summary: 'Creado con Éxito', detail: 'Organización creada', life: 3000 });


                  this.competencias = [...this.competencias];
                  this.competenciaDialog = false;
                  this.competencia = {};
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
