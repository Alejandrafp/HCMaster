import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HCMasterApiService } from 'src/app/hcmaster-api.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  constructor(private http: HttpClient, private api: HCMasterApiService) { }

  async getUsuario() {
     this.api.getUsuarios().subscribe((data) => {
      
    });

  }
}
