import { Component, OnInit } from '@angular/core';
import { RestUserService } from '../../services/restUser/rest-user.service';
import { Router } from '@angular/router';
import { CONNECTION } from '../../services/global';
import { Libro } from '../../models/libro';
import { RestLibroService } from 'src/app/services/restLibro/rest-libro.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  token:string;
  user;
  uri;
  libro:Libro;
  libroBuscado;

  constructor(private restUser:RestUserService, private router:Router, private restLibro:RestLibroService) {
    this.libro = new Libro('','','','','','','','','',null,'',null,null,null);  
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
    Swal.fire(
      'Sesión Cerrada',
      'Gracios visitarnos',
      'success'
    )
  }

  onSubmit(form){
    this.restLibro.search(this.libro).subscribe((res:any)=>{
      if(res.libroSerached){
        alert(res.message);
        this.libro = new Libro('','','','','','','','','',null,'',null,null,null);
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

  acercaDe(){
    Swal.fire({
      title: 'Diego Rodrigo Mercadal Reyes',
      text: 'Carnet: 2016490  Código Tecnico: IN6AM',
      imageUrl: '../../../assets/img/YO.jpg',
      imageWidth: 400,
      imageHeight: 400,
      imageAlt: 'Custom image',
    })
  }
}
