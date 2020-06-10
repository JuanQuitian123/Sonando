import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Importar módulo de rutas 
import { AppRoutingModule } from './app-routing.module';
// importar Módule formularios 
import { FormsModule} from '@angular/forms';
// Importar el móidulo FormularioModule
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { MenuComponent } from './components/menu/menu.component';
import { PerfilUsuarioComponent } from './components/perfil-usuario/perfil-usuario.component';
import { RegistroComponent } from './components/registro/registro.component';


// Importar Servicio Usuario
import { UsuarioService } from './services/usuario.service';

import { from } from 'rxjs';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponent,
    PerfilUsuarioComponent,
    RegistroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [UsuarioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
