import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table/table';
import { Clientes } from 'src/app/demo/api/clientes';
import { ClientesService } from '../../../service/clientes.service';

@Component({
  templateUrl: './clientes.component.html',
  providers: [MessageService]
})
export class ClientesComponent {
  clientesDialog: boolean = false;

  deleteClienteDialog: boolean = false;

  deleteClientesDialog: boolean = false;

  clientes: Clientes[] = [];

  cliente: Clientes = {};

  selectedClientes: Clientes[] = [];

  submitted: boolean = false;

  cols: any[] = [];

  statuses: any[] = [];

  rowsPerPageOptions = [5, 10, 20];

  constructor(private api: ClientesService, private messageService: MessageService) { }

  async ngOnInit() {

      this.api.getClientes().subscribe((data) => {

          this.clientes = data.map((item) => {
              return {
                  id: item.id,
                  name: item.nombre,
                  age: item.edad,
                  gender: item.genero,
                  location: item.ubicacion,
                  preferences: item.preferenciasCompra,
                  behavior: item.comportamientoLinea
              }
          });
      })
  }

  openNew() {
      this.cliente = {};
      this.submitted = false;
      this.clientesDialog = true;
  }

  async deleteSelectedClientes(clientes: Clientes) {
      this.deleteClientesDialog = true;
      this.cliente = { ...clientes };
  }

  editClientes(cliente: Clientes) {
      this.cliente = { ...cliente };
      this.clientesDialog = true;
  }

  async deleteClientes(cliente: Clientes) {
      this.deleteClienteDialog = true;
      this.cliente = { ...cliente };
  }

  confirmDeleteSelected() {
      this.deleteClientesDialog = false;
      this.clientes = this.clientes.filter(val => !this.selectedClientes.includes(val));
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Confirmar cliente', life: 3000 });
      this.selectedClientes = [];
  }

  confirmDelete(cliente: Clientes) {
      this.deleteClienteDialog = false;

      // console.log(c);


      if (cliente.id !== undefined) {
          this.api.deleteClientes(cliente.id).subscribe((data) => {
              this.clientes = this.clientes.filter((item) => (item.id !== cliente.id));
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
              this.cliente = {};  
            })
      }

  }

  hideDialog() {
      this.clientesDialog = false;
      this.submitted = false;
  }

  saveClientes() {
      this.submitted = true;

      if (this.cliente.name?.trim()) {


          if (this.cliente.id) {
              this.api.editClientes(this.cliente).subscribe((data) => {
                  const index = this.clientes.findIndex((user) => (user.id === this.cliente.id));
                  this.clientes[index] = this.cliente;
                  this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Clientes Updated', life: 3000 });

                  this.clientes = [...this.clientes];
                  this.clientesDialog = false;
                  this.cliente = {};
              })
          } else {
              this.api.addClientes(this.cliente).subscribe((data) => {
                  this.clientes.push({ ...this.cliente, id: data.id });
                  this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Clientes Created', life: 3000 });

                  this.clientes = [...this.clientes];
                  this.clientesDialog = false;
                  this.cliente = {};
              })
          }
      }
  }

  findIndexById(id: number): number {
      let index = -1;
      for (let i = 0; i < this.clientes.length; i++) {
          if (this.clientes[i].id === id) {
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

