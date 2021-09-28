import { Component, OnInit } from '@angular/core';
import { RestLibroService } from 'src/app/services/restLibro/rest-libro.service';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';
import { Libro } from 'src/app/models/libro';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-add-libro',
  templateUrl: './add-libro.component.html',
  styleUrls: ['./add-libro.component.css']
})
export class AddLibroComponent implements OnInit {
  public optionsRol = ['Libro', 'Revista'];
  user;
  token;
  libro:Libro;
  message;

  constructor(private restUser:RestUserService, private restLibro:RestLibroService, private router:Router) {
    this.user = this.restUser.getUser();
    this.token = this.restUser.getToken();
    this.libro = new Libro('','','','','','','','','',null,'',null,null,null);
  }

  ngOnInit(): void {
  }

  onSubmit(form){
    this.restLibro.addLibro(this.user._id, this.libro).subscribe((res:any)=>{
      if(res.libroSaved){
        Swal.fire(
          'Creado',
          res.message,
          'success',
        )
        this.libro = new Libro('','','','','','','','','',null,'',null,null,null);
        form.reset();
        this.router.navigateByUrl('home');
      }else{
        Swal.fire(
          'Error',
          res.message,
          'error'
        )
      }
    },
    (error:any) => this.message = error.error.message
    )
  }

}
