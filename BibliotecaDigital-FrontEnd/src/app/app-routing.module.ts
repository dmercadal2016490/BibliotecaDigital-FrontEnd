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

const routes: Routes = [
  {path:'', component:IndexComponent},
  {path:'index', component: IndexComponent},
  {path:'navbar', component: NavbarComponent},
  {path:'login', component:LoginComponent},
  {path:'home', component:HomeComponent},
  {path:'saveUser', component:SaveUserComponent},
  {path:'listUsers', component:ListUsersComponent},
  {path:'libroMasRentado', component:LibroMasRentadoComponent},
  {path:'revistaMasRentada', component:RevistaMasRentadoComponent},
  {path:'usuarioMasRenta', component:UsuarioMasRentaComponent},
  {path:'user', component:UserComponent},
  {path:'misLibros', component:NotFoundComponent},
  {path:'**', component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
