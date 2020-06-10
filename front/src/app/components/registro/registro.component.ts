import { Component, OnInit } from '@angular/core';

// Importar el módelo de usuario
import { Usuario } from '../../modelo/usuario';

// Importar el servicio Usuario
import { UsuarioService } from '../../services/usuario.service';

// Importar el objeto Router
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})

export class RegistroComponent implements OnInit {

  //Declaración variable usuarioRegistro
  public usuarioRegistro : Usuario;

  constructor(
  private usuarioService : UsuarioService,
  private _router : Router
  ) {
    this.usuarioRegistro = new Usuario('', '', '', '', '', 'usuario', '');
  }

  ngOnInit(): void {
  }
  
  //--- Método registrarUsuario() ----
  registrarUsuario(){
    this.usuarioService.registro(this.usuarioRegistro).subscribe(
      (response : any) =>{
        let usuario = response.usuario;
        this.usuarioRegistro = usuario;

        if(!this.usuarioRegistro._id){
          alert("Error al registrase");
        }else{
          alert(`Registro exitoso! Inicia sesión con ${this.usuarioRegistro.correo}`);
          this.usuarioRegistro = new Usuario('', '', '', '', '', 'usuario', '');
          this._router.navigate(['/login']);
        }
      },
      error =>{
        var errorMensaje = <any>error;

        if(errorMensaje != null){
          console.log(error);
        }
      }
    );

  }
}
