import { Component, OnInit } from '@angular/core';
import { RestLibroService } from 'src/app/services/restLibro/rest-libro.service';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';
import { CONNECTION } from 'src/app/services/global';
import { Libro } from 'src/app/models/libro';

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

  constructor(private restUser:RestUserService) {
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

}
