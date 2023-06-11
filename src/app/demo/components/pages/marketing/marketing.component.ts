import { Component,OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Marketing } from 'src/app/demo/api/marketing';
import { MarketingService } from 'src/app/demo/service/marketing.service';

@Component({
  selector: 'marketing',
  templateUrl: './marketing.component.html',
  providers: [MessageService]
})
export class MarketingComponent implements OnInit {
    marketingDialog: boolean = false;

    deleteMarketingDialog: boolean = false;

    deleteMarketingsDialog: boolean = false;

    marketings: Marketing[] = [];

    marketing: Marketing = {};

    selectedMarketings: Marketing[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(private api: MarketingService, private messageService: MessageService) { }

    ngOnInit() {
        //this.marketingService.getMarketings().then(data => this.marketings = data);

        this.api.getMarketing().subscribe((data) => {

          this.marketings = data.map((item) => {
              return {
                  id: item.id,
                  channel: item.canal,
              }
          });
      })

    }

    openNew() {
        this.marketing = {};
        this.submitted = false;
        this.marketingDialog = true;
    }

    async deleteSelectedMarketings() {
        this.deleteMarketingsDialog = true;
    }

    editMarketing(marketing: Marketing) {
        this.marketing = { ...marketing };
        this.marketingDialog = true;
    }

    async deleteMarketing(marketing: Marketing) {
        this.deleteMarketingDialog = true;
        // this.marketing = { ...marketing };    
    }

    confirmDeleteSelected() {
        this.deleteMarketingsDialog = false;
        this.marketings = this.marketings.filter(val => !this.selectedMarketings.includes(val));
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'marketings Deleted', life: 3000 });
        this.selectedMarketings = [];
    }

    confirmDelete(marketing: Marketing) {
      this.deleteMarketingsDialog = false;
      // this.organizacion = {};

      if (marketing.id !== undefined) {
          this.api.deleteMarketing(marketing.id).subscribe((data) => {
              this.marketings = this.marketings.filter(val => val.id !== this.marketing.id);
              this.messageService.add({ severity: 'success', summary: 'Elimnado con Éxito', detail: 'Eliminado', life: 3000 });
          })
      }
    }

    hideDialog() {
        this.marketingDialog = false;
        this.submitted = false;
    }

    saveMarketing() {
        this.submitted = true;

        if (this.marketing.channel?.trim()) {

          if (this.marketing.id) {
              this.api.editMarketing(this.marketing).subscribe((data) => {
                  const index = this.marketings.findIndex((user) => (user.id === this.marketing.id));
                  this.marketings[index] = this.marketing;
                  this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Organización actualizado', life: 3000 });
                  
                  this.marketings = [...this.marketings];
                  this.marketingDialog = false;
                  this.marketing = {};
              })
          } else {
              this.api.addMarketing(this.marketing).subscribe((data) => {
                  this.marketings.push({ 
                    ...this.marketing, 
                    id: data.id });
                  this.messageService.add({ severity: 'success', summary: 'Creado con Éxito', detail: 'Organización creada', life: 3000 });


                  this.marketings = [...this.marketings];
                  this.marketingDialog = false;
                  this.marketing = {};
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