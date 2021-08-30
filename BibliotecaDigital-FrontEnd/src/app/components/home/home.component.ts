import { Component, OnInit } from '@angular/core';
import { RestLibroService } from 'src/app/services/restLibro/rest-libro.service';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';
import { Libro } from 'src/app/models/libro';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user;
  token;
  libros;
  libro:Libro;
  libroSelected:Libro;

  constructor(private restLibro: RestLibroService, private restUser:RestUserService) {
    this.user = this.restUser.getUser();
    this.token = this.restUser.getToken();
   }

  ngOnInit(): void {
    this.libros = localStorage.getItem('libros');
    this.verLibros();
    this.libro;
    this.libroSelected = JSON.parse(localStorage.getItem('libroSelected'));
    this.libro = new Libro('','','','','','','','','',null,'',null,null,null);
  }

  verLibros(){
    this.restLibro.getLibros().subscribe((res:any)=>{
      if(res){
        this.libros = res.libros;
        localStorage.setItem('libros', this.libros);
        console.log(this.libros);
      }else{
        alert(res.message);
      }
    })
  }

  obtenerData(libroSelected){
    this.libro = libroSelected;
    localStorage.setItem('libroSelected', JSON.stringify(libroSelected));
    console.log(libroSelected);
  }

  agregarCopias(){
    this.restLibro.agregarCopias(this.user._id, this.libro._id,this.libro).subscribe((res:any)=>{
      if(res.agregado){
        alert(res.message);
        localStorage.setItem('libroSelected', JSON.stringify(res.agregado));
        this.refreshPage();
      }else{
        alert('No se agregaron las copias')
      }
    },
    error=> alert(error.error.message)
    )
  }

  quitarCopias(){
    this.restLibro.quitarCopias(this.user._id, this.libro._id,this.libro).subscribe((res:any)=>{
      if(res.quitado){
        alert(res.message);
        localStorage.setItem('libroSelected', JSON.stringify(res.quitado));
        this.refreshPage();
      }else{
        alert(res.message);
        this.refreshPage();
      }
    },
    error=> alert(error.error.message)
    )
  }

  refreshPage() {
    window.location.reload();
  }

}
