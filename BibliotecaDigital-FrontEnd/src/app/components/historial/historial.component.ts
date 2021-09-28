import { Component, OnInit } from '@angular/core';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';
import { RestReservacionService } from 'src/app/services/restReservacion/rest-reservacion.service';
import { CONNECTION } from 'src/app/services/global';
import { Libro } from 'src/app/models/libro';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {
  user;
  token;
  uri;
  miHistoriales;
  miHistorial:Libro;
  miLibroSelected:Libro;

  constructor(private restUser:RestUserService, private restReservacion:RestReservacionService) {
    this.user = restUser.getUser();
    this.token = restUser.getToken();
    this.uri = CONNECTION.URI
  }

  ngOnInit(): void {
    this.user = this.restUser.getUser();
    this.token = this.restUser.getToken();
    this.miHistoriales = localStorage.getItem('miHistoriales');
    this.miHistorial = new Libro('','','','','','','','','',null,'',null,null,null);
    this.miLibroSelected = JSON.parse(localStorage.getItem('miLibroSelected'));
    this.verHistorial();
  }

  verHistorial(){
    this.restUser.miHistorial(this.user._id).subscribe((res:any)=>{
      if(res.historial){
        this.miHistoriales = res.historial.Historial;
        localStorage.setItem('miHistoriales', JSON.stringify(this.miHistoriales));
        Swal.fire(
          'Historial',
          'Este es tu historial',
          'info',
        )
      }else{
        alert('Error');
      }
    },
    (error:any) => alert(error.error.message)
    )
  }

  limpiarHistorial(){
    this.restReservacion.limpiarHistorial(this.user._id).subscribe((res:any)=>{
      if(res.erased){
        alert(res.message);
        this.user = res.erased;
        localStorage.setItem('user', JSON.stringify(this.user));
        this.refreshPage()
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
