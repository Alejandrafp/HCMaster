import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table/table';
import { Usuario } from 'src/app/demo/api/usuario';
import { HCMasterApiService } from 'src/app/hcmaster-api.service';

@Component({
    templateUrl: './usuario.component.html',
    providers: [MessageService]
})
export class UsuarioComponent implements OnInit {

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

    constructor(private api: HCMasterApiService, private messageService: MessageService) { }

    async ngOnInit() {

        this.api.getUsuarios().subscribe((data) => {

            this.usuarios = data.map((item) => {
                return {
                    id: item.id,
                    name: item.nombre,
                    lastname: item.apellido,
                    email: item.correoElectronico,
                    password: item.contrasena,
                    phone: item.telefono,
                    address: item.direccion
                }
            });
        })
    }

    openNew() {
        this.usuario = {};
        this.submitted = false;
        this.usuarioDialog = true;
    }

    async deleteSelectedUsuarios() {
        this.deleteUsuariosDialog = true;

    }

    editUsuarios(usuario: Usuario) {
        this.usuario = { ...usuario };
        this.usuarioDialog = true;
    }

    async deleteUsuarios(usuario: Usuario) {
        this.deleteUsuarioDialog = true;
    }

    confirmDeleteSelected() {
        this.deleteUsuariosDialog = false;
        this.usuarios = this.usuarios.filter(val => !this.selectedUsuarios.includes(val));
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Confirm', life: 3000 });
        this.selectedUsuarios = [];
    }

    confirmDelete(usuario: Usuario) {
        this.deleteUsuarioDialog = false;

        console.log(usuario);


        if (usuario.id !== undefined) {
            this.api.deleteUsuario(usuario.id).subscribe((data) => {
                this.usuarios = this.usuarios.filter((item) => (item.id !== usuario.id));
            })
        }
        /* 
       this.usuarios = this.usuarios.filter(val => val.id !== this.usuario.id);
       this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
       this.usuario = {};   
       */
    }

    hideDialog() {
        this.usuarioDialog = false;
        this.submitted = false;
    }

    saveUsuarios() {
        this.submitted = true;

        if (this.usuario.name?.trim()) {


            if (this.usuario.id) {
                this.api.editUsuario(this.usuario).subscribe((data) => {
                    const index = this.usuarios.findIndex((user) => (user.id === this.usuario.id));
                    this.usuarios[index] = this.usuario;
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Usuario Updated', life: 3000 });

                    this.usuarios = [...this.usuarios];
                    this.usuarioDialog = false;
                    this.usuario = {};
                })
            } else {
                this.api.addUsuario(this.usuario).subscribe((data) => {
                    this.usuarios.push(this.usuario);
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Usuario Created', life: 3000 });

                    this.usuarios = [...this.usuarios];
                    this.usuarioDialog = false;
                    this.usuario = {};
                })
            }
        }
    }

    findIndexById(id: number): number {
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
