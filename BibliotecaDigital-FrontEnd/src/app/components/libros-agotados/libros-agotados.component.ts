import { Component, OnInit } from '@angular/core';
import { RestLibroService } from 'src/app/services/restLibro/rest-libro.service';

@Component({
  selector: 'app-libros-agotados',
  templateUrl: './libros-agotados.component.html',
  styleUrls: ['./libros-agotados.component.css']
})
export class LibrosAgotadosComponent implements OnInit {
  data;

  constructor(private restLibro:RestLibroService) { }

  ngOnInit(): void {
    this.librosAgotados();
    this.data = localStorage.getItem('consulta');
  }

  librosAgotados(){
    this.restLibro.librosAgotados().subscribe((res:any)=>{
      if(res.found){
        this.data = res.found;
        localStorage.setItem('consulta', JSON.stringify(this.data));
      }else{
        alert(res.message);
      }
    },
    (error:any) => alert('Error al cargar')
    )
  }

}
