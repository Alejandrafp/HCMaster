export interface ActividadesVoluntariado {
    id?: number;
    titulo?: string;
    descripcion?: string;
    ubicacion?:string;
    fechaHora?:Date;
    voluntariosRequeridos?: number;
    organizacionId?: number;
}
