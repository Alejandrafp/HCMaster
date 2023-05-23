import { Component,OnInit } from '@angular/core';
import { MarketingService } from '../../services/marketing.service';
import { MessageService } from 'primeng/api';

import { Marketing} from '../../api/marketing';
import { Table } from 'primeng/table';
@Component({
  selector: 'marketing',
  templateUrl: './marketing.component.html',
  styleUrls: ['./marketing.component.scss']
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

    constructor(private marketingService: MarketingService, private messageService: MessageService) { }

    ngOnInit() {
        //this.marketingService.getMarketings().then(data => this.marketings = data);

        this.cols = [
            { field: 'id', header: 'Id' },
            { field: 'canal', header: 'Canal' },
          
        ];

    }

    openNew() {
        this.marketing = {};
        this.submitted = false;
        this.marketingDialog = true;
    }

    deleteSelectedMarketings() {
        this.deleteMarketingsDialog = true;
    }

    editMarketing(marketing: Marketing) {
        this.marketing = { ...marketing };
        this.marketingDialog = true;
    }

    deleteMarketing(marketing: Marketing) {
        this.deleteMarketingDialog = true;
        this.marketing = { ...marketing };
        
    }

    confirmDeleteSelected() {
        this.deleteMarketingsDialog = false;
        this.marketings = this.marketings.filter(val => !this.selectedMarketings.includes(val));
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'marketings Deleted', life: 3000 });
        this.selectedMarketings = [];
    }

    confirmDelete() {
        this.deleteMarketingDialog = false;
        this.marketings = this.marketings.filter(val => val.id !== this.marketing.id);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'marketing Deleted', life: 3000 });
        this.marketing = {};
    }

    hideDialog() {
        this.marketingDialog = false;
        this.submitted = false;
    }

    saveMarketing() {
        this.submitted = true;

        if (this.marketing.canal?.trim()) {
            if (this.marketing.id) {
                // @ts-ignore
                //this.marketing.inventoryStatus = this.marketing.inventoryStatus.value ? this.marketing.inventoryStatus.value : this.marketing.inventoryStatus;
                this.marketings[this.findIndexById(this.marketing.id)] = this.marketing;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'marketing Updated', life: 3000 });
            } else {
                this.marketingService.createMarketing(this.marketing);
                //this.marketing.id = this.createId();
                //this.marketing.code = this.createId();
                //this.marketing.image = 'marketing-placeholder.svg';
                // @ts-ignore
                //this.marketing.inventoryStatus = this.marketing.inventoryStatus ? this.marketing.inventoryStatus.value : 'INSTOCK';
                this.marketings.push(this.marketing);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'marketing Created', life: 3000 });
            }

            this.marketings = [...this.marketings];
            this.marketingDialog = false;
            this.marketing = {};
        }
    }

    findIndexById(id: string): number {
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