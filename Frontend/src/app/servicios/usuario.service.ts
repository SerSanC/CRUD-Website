import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../modelos/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private BASE_URL = 'http://127.0.0.1:4000/usuarios';

  constructor(
    private http: HttpClient,
  ) { }

  getUsuarios(){
    return this.http.get(`${this.BASE_URL}/listar-usuarios`, { });
  }
  crearUsuario(usuario:Usuario){
    return this.http.post(`${this.BASE_URL}/crear-usuarios`,usuario);
  }
  updateUsuario(usuario:Usuario){
    return this.http.put(`${this.BASE_URL}/actualizar-usuario`,usuario);
  }
  borradoUsuario(usuario:any){

    return this.http.delete(`${this.BASE_URL}/borrado-usuario/${usuario._id}`,{});
  }
}
