import { Component, OnInit } from '@angular/core';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-usuario-mas-renta',
  templateUrl: './usuario-mas-renta.component.html',
  styleUrls: ['./usuario-mas-renta.component.css']
})
export class UsuarioMasRentaComponent implements OnInit {
  data;

  constructor(private restUser:RestUserService) { }

  ngOnInit(): void {
    this.usuarioRenta();
    this.data = localStorage.getItem('consulta');
  }

  usuarioRenta(){
    this.restUser.usuarioMasRenta().subscribe((res:any)=>{
      if(res.userFind){
        Swal.fire(
          'Encontados',
          'Usuario con mas rentas',
          'info',
        )
        this.data = res.userFind;
        localStorage.setItem('consulta', JSON.stringify(this.data));
      }else{
        alert(res.message);
      }
    },
    (error:any) => alert('Error al cargar')
    )
  }

  usuarioMas(){
    this.restUser.usuarioMasRenta().subscribe((res:any)=>{
      if(res.userFind){
        this.data = res.userFind;
        localStorage.setItem('consulta', JSON.stringify(this.data));
      }else{
        alert(res.message);
      }
    },
    (error:any) => alert('Error al cargar')
    )
  }

  usuarioMenos(){
    this.restUser.usuarioMenosRenta().subscribe((res:any)=>{
      if(res.userFind){
        this.data = res.userFind;
        localStorage.setItem('consulta', JSON.stringify(this.data));
      }else{
        alert(res.message);
      }
    },
    (error:any) => alert('Error al cargar')
    )
  }

}
