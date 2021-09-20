import { Component, OnInit } from '@angular/core';
import { RestUserService } from '../../services/restUser/rest-user.service';
import { Router } from '@angular/router';
import { CONNECTION } from '../../services/global';
import { Libro } from '../../models/libro';
import { RestLibroService } from 'src/app/services/restLibro/rest-libro.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  token:string;
  user;
  uri;
  libroBuscar:Libro;
  libroBuscado;

  constructor(private restUser:RestUserService, private router:Router, private restLibro:RestLibroService) {
    this.libroBuscar = new Libro('','','','','','','','','',null,'',null,null,null);  
  }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.user = JSON.parse(localStorage.getItem('user'));
    this.uri = CONNECTION.URI
  }

  ngDoCheck(){
    this.token = this.restUser.getToken();
    this.user = this.restUser.getUser();
  }

  logOut(){
    localStorage.clear();
    this.router.navigateByUrl('index')
    alert('Gracias por visitarnos. Vuelve pronto')
  }

  onSubmit(form){
    this.restLibro.search(this.libroBuscar).subscribe((res:any)=>{
      if(res.libroSerached){
        alert(res.message);
        this.libroBuscado = res.libroSerached.libroSerached;
        form.reset();
        localStorage.setItem('libroSearched', JSON.stringify(this.libroBuscado))
      }else{
        alert(res.message)
      }
    },
    (error:any) => alert(error.error.message)
    )
  }
}
