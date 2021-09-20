import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './components/index/index.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { SaveUserComponent } from './components/save-user/save-user.component';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { LibroMasRentadoComponent } from './components/libro-mas-rentado/libro-mas-rentado.component';
import { RevistaMasRentadoComponent } from './components/revista-mas-rentado/revista-mas-rentado.component';
import { UsuarioMasRentaComponent } from './components/usuario-mas-renta/usuario-mas-renta.component';
import { UserComponent } from './components/user/user.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { MisLibrosComponent } from './components/mis-libros/mis-libros.component';
import { LibrosAgotadosComponent } from './components/libros-agotados/libros-agotados.component';
import { AddLibroComponent } from './components/add-libro/add-libro.component';
import { HistorialComponent } from './components/historial/historial.component';


//Guards
import { LoggedGuardGuard } from './guards/logged-guard.guard';
import { LoggedoutGuardGuard } from './guards/logged-out-guard.guard';
import { AdminGuardGuard } from './guards/admin-guard.guard';

const routes: Routes = [
  {path:'', component:IndexComponent},
  {path:'index', canActivate:[LoggedoutGuardGuard],component: IndexComponent},
  {path:'navbar', component: NavbarComponent},
  {path:'login',canActivate:[LoggedoutGuardGuard], component:LoginComponent},
  {path:'home',canActivate:[LoggedGuardGuard], component:HomeComponent},
  {path:'saveUser',canActivate:[AdminGuardGuard], component:SaveUserComponent},
  {path:'listUsers',canActivate:[AdminGuardGuard], component:ListUsersComponent},
  {path:'libroMasRentado',canActivate:[AdminGuardGuard], component:LibroMasRentadoComponent},
  {path:'revistaMasRentada',canActivate:[AdminGuardGuard], component:RevistaMasRentadoComponent},
  {path:'usuarioMasRenta',canActivate:[AdminGuardGuard], component:UsuarioMasRentaComponent},
  {path:'user',canActivate:[LoggedGuardGuard], component:UserComponent},
  {path:'misLibros',canActivate:[LoggedGuardGuard], component:MisLibrosComponent},
  {path:'librosAgotados',canActivate:[AdminGuardGuard], component:LibrosAgotadosComponent},
  {path:'addLibro', component:AddLibroComponent},
  {path:'historial', canActivate:[LoggedGuardGuard], component:HistorialComponent},
  {path:'**', component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
