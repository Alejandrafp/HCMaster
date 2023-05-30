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

  deleteProyectosDialog: boolean = false;

  deleteProyectossDialog: boolean = false;

  proyectoss: Proyectos[] = [];

  proyectos: Proyectos = {};

  selectedProyectoss: Proyectos[] = [];

  submitted: boolean = false;

  cols: any[] = [];

  statuses: any[] = [];

  rowsPerPageOptions = [5, 10, 20];

  constructor(private proyectosService: ProyectosService, private messageService: MessageService) { }

  ngOnInit() {
      this.proyectosService.getProyectos().then(data => this.proyectoss = data);

      this.cols = [
          { field: 'name', header: 'Nombre' },
          { field: 'address', header: 'Dirección' },
          { field: 'email', header: 'Correo' },
          { field: 'phone', header: 'Teléfono' },
          { field: 'description', header: 'Descripcion' }
      ];
  }

  openNew() {
      this.proyectos = {};
      this.submitted = false;
      this.proyectosDialog = true;
  }

  deleteSelectedProyectoss() {
      this.deleteProyectossDialog = true;
  }

  editProyectos(proyectos: Proyectos) {
      this.proyectos = { ...proyectos };
      this.proyectosDialog = true;
  }

  deleteProyectos(proyectos: Proyectos) {
      this.deleteProyectosDialog = true;
      this.proyectos = { ...proyectos };
  }

  confirmDeleteSelected() {
      this.deleteProyectossDialog = false;
      this.proyectoss = this.proyectoss.filter(val => !this.selectedProyectoss.includes(val));
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
      this.selectedProyectoss = [];
  }

  confirmDelete() {
      this.deleteProyectosDialog = false;
      this.proyectoss = this.proyectoss.filter(val => val.id !== this.proyectos.id);
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
      this.proyectos = {};
  }

  hideDialog() {
      this.proyectosDialog = false;
      this.submitted = false;
  }

  saveProyectos() {
      this.submitted = true;

      if (this.proyectos.name?.trim()) {
          if (this.proyectos.id) {
              // @ts-ignore
              // this.product.inventoryStatus = this.product.inventoryStatus.value ? this.product.inventoryStatus.value : this.product.inventoryStatus;
              this.proyectoss[this.findIndexById(this.proyectos.id)] = this.proyectos;
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Proyectos Updated', life: 3000 });
          } else {
              this.proyectos.id = this.createId();
              // @ts-ignore
              // this.product.inventoryStatus = this.product.inventoryStatus ? this.product.inventoryStatus.value : 'INSTOCK';
              this.proyectoss.push(this.proyectos);
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Proyectos Created', life: 3000 });
          }

          this.proyectoss = [...this.proyectoss];
          this.proyectosDialog = false;
          this.proyectos = {};
      }
  }

  findIndexById(id: string): number {
      let index = -1;
      for (let i = 0; i < this.proyectoss.length; i++) {
          if (this.proyectoss[i].id === id) {
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
