import { Component } from '@angular/core';
import { Usuario } from './modelos/usuario';
import { UsuarioService } from './servicios/usuario.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  usuarioArray: Usuario[] = []
  selectedUser:Usuario = new Usuario()
  constructor(
    private usuarioService: UsuarioService
  ) {
  }

  ngOnInit() {
   this.loadUsers()
  }
  loadUsers() {
    this.usuarioService.getUsuarios().subscribe(
      // Si la respuesta es código 200
      (resp: any) => {
        this.usuarioArray = resp.data
        console.log(resp)
      },
      // Si la respuesta es código 400/500
      (error_resp: any) => {
        console.log("ENTRAS EN EL ERROR:\n\n",error_resp);
      }
    ); 
  }

  seleccionar(usuario:Usuario){
      console.log("Seleccionado")
      this.selectedUser = usuario
  }

  updateUser(){
    this.usuarioService.updateUsuario(this.selectedUser).subscribe(
      // Si la respuesta es código 200
      (resp: any) => {
        console.log(resp)
        this.loadUsers()
      },
      // Si la respuesta es código 400/500
      (error_resp: any) => {
        console.log("ENTRAS EN EL ERROR:\n\n",error_resp);
      }
    ); 
  }

  createUser(){
    console.log(this.selectedUser)
    this.usuarioService.crearUsuario(this.selectedUser).subscribe(
      // Si la respuesta es código 200
      (resp: any) => {
        console.log(resp)
        this.loadUsers()
      },
      // Si la respuesta es código 400/500
      (error_resp: any) => {
        console.log("ENTRAS EN EL ERROR:\n\n",error_resp);
      }
    ); 
  }

  deleteUser(){
    this.usuarioService.borradoUsuario(this.selectedUser).subscribe(
      // Si la respuesta es código 200
      (resp: any) => {
        console.log(resp)
        this.loadUsers()
      },
      // Si la respuesta es código 400/500
      (error_resp: any) => {
        console.log("ENTRAS EN EL ERROR:\n\n",error_resp);
      }
    ); 
  }
}
