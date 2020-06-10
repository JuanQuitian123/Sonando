import { Injectable } from '@angular/core';

// Importar los módulos HttpClient y HttpHeaders
import { HttpClient, HttpHeaders} from '@angular/common/http';

// Importar el map
import { map } from 'rxjs/operators';

// Importar Observable
import { Observable } from 'rxjs';

@Injectable()
export class UsuarioService {

  // Declarar la variable url de la api 
  url = 'http://localhost:3000/api/';

  // Declarar la variable identidad del usuario logueado 
  public identidad;

  // Declarar variable privada de tipo HttpClient 
  constructor(
    private _http : HttpClient
  ) { }

  //--------------------------
  // Declarar el método del servicio registro 
  registro(usuarioNuevo){
    let params = JSON.stringify(usuarioNuevo);
    let options = {
      headers: new HttpHeaders({'Content-Type' : 'application/json'})
    };
    return this._http.post(
      this.url + 'registro',
      params,
      options
    ).pipe(map(res => res));
  }

  // ------------------------------------
  // Declarar el método del servicio iniciarSesion
  iniciarSesion(usuarioLogueado){
    let params = JSON.stringify(usuarioLogueado);
    let options = {
      headers : new HttpHeaders({'Content-Type' : 'application/json'})
    }
    return this._http.post(
      this.url + 'iniciar-sesion',
      params,
      options
    ).pipe(map(res => res));
  }
  // -----------------------------
  // Declarar el método del  servicio obtenerNombreUsuario
  obtenerNombreUsuario(){
    /* 
      En una variable llamada identidad recogeremos los datos de nuestro usuario
      una vez que haya iniciado sesion.Estos datos se encuentrar en el local storage.
    */
   let usuarioAutorizado = JSON.parse(localStorage.getItem('sesion'));


   // Validar si el espacio esta vacio LocalStorage está vacio
   if(usuarioAutorizado != 'undefined'){
     this.identidad = usuarioAutorizado;
   }else{
     this.identidad = null;
   }

   return this.identidad;
  }

  // ------------------------------
  // Declarar el método del servicio editarUsuario
  editarUsuario(id, usuarioAutorizado){
    let params = JSON.stringify(usuarioAutorizado);
    let options = {
      headers: new HttpHeaders({'Content-Type' : 'application/json'})
    }
    return this._http.put(
      this.url + 'actualizar-usuario/' + id,
      params,
      options
    ).pipe(map(res => res));
  }
  // ------------------------------
  // Declarar el método del servicio cargarImagenUsuario
  cargarImagenUsuario(file: File, id){
    // Instancia el objeto FormData que nos permitirá enviar la img 
    let formData = new FormData();
    // Postman form data -> key imagen, file o text -> seleccionar archivos 
    formData.append('imagen', file);
    return this._http.put(
      this.url + 'subirImagen/' + id,
      formData
    ).pipe(map(res => res));
  }
  // ----------------------------------------------

}
