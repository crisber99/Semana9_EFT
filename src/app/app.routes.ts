import { Routes } from '@angular/router';
import { ListaPersonasComponent } from './components/lista-personas/lista-personas.component';
import { LoginComponent } from './components/login/login.component';
import { MenuComponent } from './components/menu/menu.component';
import { RecuperaPassComponent } from './components/recupera-pass/recupera-pass.component';
import { QuienesSomosComponent } from './components/quienes-somos/quienes-somos.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { CatalogoComponent } from './components/catalogo/catalogo.component';
import { RegistroComponent } from './components/registro/registro.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { CookieService } from 'ngx-cookie-service';

export const routes: Routes = [
    {path: 'lista-personas', component: ListaPersonasComponent},
    // {path: '**', redirectTo: 'lista-personas'},
    {path:'login', component:LoginComponent},
    {path:'menu', component:MenuComponent},
    {path:'catalogo', component:CatalogoComponent},
    {path:'inicio', component:InicioComponent},
    {path:'quienes-somos', component:QuienesSomosComponent},
    {path:'recuperar-pass', component:RecuperaPassComponent},
    {path:'registro', component:RegistroComponent},
    {path:'perfil', component:PerfilComponent},
    {path:'usuario',component:UsuarioComponent}
];

