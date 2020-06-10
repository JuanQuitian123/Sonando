import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

// Importar los componetes de navegación
import { RegistroComponent } from './components/registro/registro.component';
import { LoginComponent } from './components/login/login.component';
import { PerfilUsuarioComponent } from './components/perfil-usuario/perfil-usuario.component';

// Relacionar rutas con componentes 
const routes: Routes = [
    {path: '', component: RegistroComponent},
    {path: 'login', component: LoginComponent},
    {path: 'perfil', component: PerfilUsuarioComponent}
];

// Importamos en la raiz de RouterModule el array de rutas y luego exportamos el nuevo módulo
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

// Exportar el módulo
export class AppRoutingModule {} 