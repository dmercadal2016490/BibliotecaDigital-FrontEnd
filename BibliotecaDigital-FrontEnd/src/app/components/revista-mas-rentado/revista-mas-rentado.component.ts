import { Component, OnInit } from '@angular/core';
import { RestLibroService } from 'src/app/services/restLibro/rest-libro.service';

@Component({
  selector: 'app-revista-mas-rentado',
  templateUrl: './revista-mas-rentado.component.html',
  styleUrls: ['./revista-mas-rentado.component.css']
})
export class RevistaMasRentadoComponent implements OnInit {
  data;

  constructor(private restLibro:RestLibroService) { }

  ngOnInit(): void {
    this.revistaRentada();
    this.data = localStorage.getItem('consulta');
  }

  revistaRentada(){
    this.restLibro.revistaMasRentada().subscribe((res:any)=>{
      if(res.revistaFound){
        this.data = res.revistaFound;
        localStorage.setItem('consulta', JSON.stringify(this.data));
      }else{
        alert(res.message);
      }
    },
    (error:any) => alert('Error al cargar')
    )
  }

}
