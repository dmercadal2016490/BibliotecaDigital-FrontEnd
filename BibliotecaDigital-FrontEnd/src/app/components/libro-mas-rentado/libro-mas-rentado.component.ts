import { Component, OnInit } from '@angular/core';
import { RestLibroService } from 'src/app/services/restLibro/rest-libro.service';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-libro-mas-rentado',
  templateUrl: './libro-mas-rentado.component.html',
  styleUrls: ['./libro-mas-rentado.component.css']
})
export class LibroMasRentadoComponent implements OnInit {
  data;
  titulo;
  compras;


  constructor(private restLibro:RestLibroService) { }

  ngOnInit(): void {
    this.libroRentado();
    this.data = localStorage.getItem('consulta');
  }

  libroRentado(){
    this.restLibro.libroMasRentado().subscribe((res:any)=>{
      if(res.libroFound){
        Swal.fire(
          'Encontados',
          'Libros mas rentados',
          'info',
        )
        this.data = res.libroFound;
        localStorage.setItem('consulta', JSON.stringify(this.data));
      }else{
        Swal.fire(
          'Sin resultados',
          res.message,
          'warning',
        )
      }
    },
    (error:any) => alert('Error al cargar')
    )
  }

  getTitulo(){
    this.titulo = JSON.stringify(localStorage.getItem('consulta'))
    return this.titulo.titulo
  }

  getCompras(){
    this.compras = this.restLibro.getConsulta().compras
  }

  libroMas(){
    this.restLibro.libroMasRentado().subscribe((res:any)=>{
      if(res.libroFound){
        this.data = res.libroFound;
        localStorage.setItem('consulta', JSON.stringify(this.data));
      }else{
        Swal.fire(
          'Sin resultados',
          res.message,
          'warning',
        )
      }
    },
    (error:any) => alert('Error al cargar')
    )
  }

  libroMenos(){
    this.restLibro.libroMenosRentado().subscribe((res:any)=>{
      if(res.libroFound){
        this.data = res.libroFound;
        localStorage.setItem('consulta', JSON.stringify(this.data));
      }else{
        Swal.fire(
          'Sin resultados',
          res.message,
          'warning',
        )
      }
    },
    (error:any) => alert('Error al cargar')
    )
  }

}
