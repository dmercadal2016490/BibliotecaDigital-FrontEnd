import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
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

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent,
    SaveUserComponent,
    ListUsersComponent,
    LibroMasRentadoComponent,
    RevistaMasRentadoComponent,
    UsuarioMasRentaComponent,
    UserComponent,
    NotFoundComponent,
    MisLibrosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
