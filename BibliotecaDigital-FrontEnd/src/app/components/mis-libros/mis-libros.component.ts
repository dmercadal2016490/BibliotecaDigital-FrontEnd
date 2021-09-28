import { Component, OnInit } from '@angular/core';
import { RestLibroService } from 'src/app/services/restLibro/rest-libro.service';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';
import { RestReservacionService } from 'src/app/services/restReservacion/rest-reservacion.service';
import { CONNECTION } from 'src/app/services/global';
import { Libro } from 'src/app/models/libro';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-mis-libros',
  templateUrl: './mis-libros.component.html',
  styleUrls: ['./mis-libros.component.css']
})
export class MisLibrosComponent implements OnInit {
  user;
  token;
  uri;
  misLibros;
  miLibro:Libro;
  miLibroSelected:Libro;

  constructor(private restUser:RestUserService, private restReservacion:RestReservacionService) {
    this.user = restUser.getUser();
    this.token = restUser.getToken();
    this.uri = CONNECTION.URI
  }

  ngOnInit(): void {
    this.user = this.restUser.getUser();
    this.token = this.restUser.getToken();
    this.verMisLibros();
    this.misLibros = localStorage.getItem('misLibros');
    this.miLibro = new Libro('','','','','','','','','',null,'',null,null,null);
    this.miLibroSelected = JSON.parse(localStorage.getItem('miLibroSelected'));
  }

  verMisLibros(){
    this.restUser.misLibros(this.user._id).subscribe((res:any)=>{
      if(res.libros){
        this.misLibros = res.libros.Libros;
        localStorage.setItem('misLibros', JSON.stringify(this.misLibros))
      }else{
        alert(res.message);
      }
    },
    (error:any) => alert(error.error.message)
    )
  }

  obtenerData(miLibroSelected){
    this.miLibro = miLibroSelected;
    localStorage.setItem('miLibroSelected', JSON.stringify(miLibroSelected));
  }

  devolver(){
    this.restReservacion.devolver(this.user._id, this.miLibro._id).subscribe((res:any)=>{
      if(res.devuelto){
        Swal.fire(
          'Devuelto',
          res.message,
          'success',
        ).then(this.refreshPage)
        this.user = res.devuelto;
        localStorage.setItem('user', JSON.stringify(this.user));
      }else{
        alert(res.message);
      }
    },
    (error:any) => alert(error.error.message)
    )
  }

  refreshPage() {
    window.location.reload();
  }

}
