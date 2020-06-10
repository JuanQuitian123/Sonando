import { Component, OnInit } from '@angular/core';

// Importa el modelo 
import { Usuario } from '../../modelo/usuario';

//importar el servicio 
import { UsuarioService } from '../../services/usuario.service';


// Importar el meneje de rutas 
import { Router, ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // Declara la variable login de tipo Usuario
  public login : Usuario;

  // Declarar la variable identidad que también está en usuario.service
  public identidad;

  constructor(
    private usuarioService : UsuarioService,
    private _router : Router
  ) {
    this.login = new Usuario('', '', '', '', '', 'usuario', '');
  }

  ngOnInit(): void {
  }

  // Método loginUsuario que consumirá el servicio iniciarSesion --
  loginUsuario(){
    this.usuarioService.iniciarSesion(this.login).subscribe(
      (response : any)=>{
        // this.login = response.usuario
        let usuario = response.usuario;
        this.login = usuario;
        if(this.login){
          let usuarioLogueado = new Usuario(
            this.login._id,
            this.login.nombre,
            this.login.apellido,
            this.login.correo,
            this.login.contrasena,
            this.login.rol,
            this.login.imagen
          );

          // Crear el objeto localStorage
          localStorage.setItem('sesion', JSON.stringify(usuarioLogueado));
          // Consumir el servicio obtenerNombreUsuario
          this.identidad = this.usuarioService.obtenerNombreUsuario();
          alert(`Hola ${this.identidad.nombre}!! Bienvenid@`);
          // Redirección al perfil
          this._router.navigate(['/perfil']);
        }else{
          alert('Usuario no identificado');
        }
        // Cierre validación usuario loqueado
      },
      error =>{
        if(error != null){
          console.log(error);
        }
      }
    );
  }
  // -- Fin Método -- 
}
