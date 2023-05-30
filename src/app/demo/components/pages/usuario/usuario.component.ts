import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table/table';
import { Usuario } from 'src/app/demo/api/usuario';
import { UsuarioService } from 'src/app/demo/service/usuario.service';

@Component({
  templateUrl: './usuario.component.html',
  providers: [MessageService]
})
export class UsuarioComponent implements OnInit{

  usuarioDialog: boolean = false;

  deleteUsuarioDialog: boolean = false;

  deleteUsuariosDialog: boolean = false;

  usuarios: Usuario[] = [];

  usuario: Usuario = {};

  selectedUsuarios: Usuario[] = [];
  
  submitted: boolean = false;

  cols: any[] = [];

  statuses: any[] = [];

  rowsPerPageOptions = [5, 10, 20];

  constructor(private usuarioService: UsuarioService, private messageService: MessageService) { }

  ngOnInit() {
      this.usuarioService.getUsuario().then(data => this.usuarios = data);

      this.cols = [
          { field: 'name', header: 'Nombre' },
          { field: 'address', header: 'Dirección' },
          { field: 'email', header: 'Correo' },
          { field: 'phone', header: 'Teléfono' },
          { field: 'description', header: 'Descripcion' }
      ];
  }

  openNew() {
      this.usuario = {};
      this.submitted = false;
      this.usuarioDialog = true;
  }

  deleteSelectedUsuarios() {
      this.deleteUsuariosDialog = true;
  }

  editUsuarios(usuario: Usuario) {
      this.usuario = { ...usuario };
      this.usuarioDialog = true;
  }

  deleteUsuarios(usuario: Usuario) {
      this.deleteUsuarioDialog = true;
      this.usuario = { ...usuario };
  }

  confirmDeleteSelected() {
      this.deleteUsuariosDialog = false;
      this.usuarios = this.usuarios.filter(val => !this.selectedUsuarios.includes(val));
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Confirm', life: 3000 });
      this.selectedUsuarios = [];
  }

  confirmDelete() {
      this.deleteUsuarioDialog = false;
      this.usuarios = this.usuarios.filter(val => val.id !== this.usuario.id);
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
      this.usuario = {};
  }

  hideDialog() {
      this.usuarioDialog = false;
      this.submitted = false;
  }

  saveUsuarios() {
      this.submitted = true;

      if (this.usuario.name?.trim()) {
          if (this.usuario.id) {
              // @ts-ignore
              // this.product.inventoryStatus = this.product.inventoryStatus.value ? this.product.inventoryStatus.value : this.product.inventoryStatus;
              this.usuarios[this.findIndexById(this.usuario.id)] = this.usuario;
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Usuario Updated', life: 3000 });
          } else {
              this.usuario.id = this.createId();
              // @ts-ignore
              // this.product.inventoryStatus = this.product.inventoryStatus ? this.product.inventoryStatus.value : 'INSTOCK';
              this.usuarios.push(this.usuario);
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Usuario Created', life: 3000 });
          }

          this.usuarios = [...this.usuarios];
          this.usuarioDialog = false;
          this.usuario = {};
      }
  }

  findIndexById(id: string): number {
      let index = -1;
      for (let i = 0; i < this.usuarios.length; i++) {
          if (this.usuarios[i].id === id) {
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
