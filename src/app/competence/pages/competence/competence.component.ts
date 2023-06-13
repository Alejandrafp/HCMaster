import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table/table';
import { Competence } from '../../api/competence';
import { CompetenceService } from '../../service/competence.service';


@Component({
  selector: 'app-competence',
  templateUrl: './competence.component.html',
  styleUrls: ['./competence.component.scss']
})
export class CompetenceComponent implements OnInit {
  competenceDialog: boolean = false;

    deleteCompetenceDialog: boolean = false;

    deleteCompetencesDialog: boolean = false;

    competences: Competence[] = [];

    competence: Competence = {};

    selectedCompetences: Competence[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(private competenceService: CompetenceService, private messageService: MessageService) { }

    ngOnInit() {
        this.competenceService.getCompetences().then(data => this.competences = data);

        this.cols = [
            { field: 'id', header: 'Id' },
            { field: 'name', header: 'Nombre' },
            { field: 'product', header: 'Prducto' },
            { field: 'marketing', header: 'Estrategia de marketing' },
            { field: 'prices', header: 'Precios' },
          
        ];

    }

    openNew() {
        this.competence = {};
        this.submitted = false;
        this.competenceDialog = true;
    }

    deleteSelectedCompetences() {
        this.deleteCompetencesDialog = true;
    }

    editCompetence(competence: Competence) {
        this.competence = { ...competence };
        this.competenceDialog = true;
    }

    deleteCompetence(competence: Competence) {
        this.deleteCompetenceDialog = true;
        this.competence = { ...competence };
    }

    confirmDeleteSelected() {
        this.deleteCompetencesDialog = false;
        this.competences = this.competences.filter(val => !this.selectedCompetences.includes(val));
        for(let competencia of this.selectedCompetences){
            this.competenceService.deleteCompetence(competencia.id!);
        }
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'competences Deleted', life: 3000 });
        this.selectedCompetences = [];
    }

    confirmDelete() {
        this.deleteCompetenceDialog = false;
        this.competences = this.competences.filter(val => val.id !== this.competence.id);

        this.competenceService.deleteCompetence(this.competence.id!);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'competence Deleted', life: 3000 });
        this.competence = {};
    }

    hideDialog() {
        this.competenceDialog = false;
        this.submitted = false;
    }

    saveCompetence() {
        this.submitted = true;

        if (this.competence.name?.trim()) {
            if (this.competence.id) {
                // @ts-ignore
                //this.competence.inventoryStatus = this.competence.inventoryStatus.value ? this.competence.inventoryStatus.value : this.competence.inventoryStatus;
                this.competences[this.findIndexById(this.competence.id)] = this.competence;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'competence Updated', life: 3000 });
            } else {
                this.competenceService.saveCompetence(this.competence);
                //this.competence.id = this.createId();
                //this.competence.code = this.createId();
                //this.competence.image = 'competence-placeholder.svg';
                // @ts-ignore
                //this.competence.inventoryStatus = this.competence.inventoryStatus ? this.competence.inventoryStatus.value : 'INSTOCK';
                this.competences.push(this.competence);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'competence Created', life: 3000 });
            }

            this.competences = [...this.competences];
            this.competenceDialog = false;
            this.competence = {};
        }
    }

    findIndexById(id: string): number {
        let index = -1;
        /*for (let i = 0; i < this.competences.length; i++) {
            if (this.competences[i].id === id) {
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
