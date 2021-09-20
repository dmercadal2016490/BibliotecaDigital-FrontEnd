import { Component, OnInit } from '@angular/core';
import { RestLibroService } from 'src/app/services/restLibro/rest-libro.service';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';
import { RestReservacionService } from 'src/app/services/restReservacion/rest-reservacion.service';
import { UploadImageService } from 'src/app/services/uploadImage/upload-image.service';
import { Libro } from 'src/app/models/libro';
import { CONNECTION } from 'src/app/services/global';

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
  public filesToUpload:Array<File>;
  uri;
  message;
  public optionsRol = ['Libro', 'Revista'];
  search;
  librosNuscar:[]

  constructor(private restLibro: RestLibroService, private restUser:RestUserService,
              private uploadImage: UploadImageService, private restReservacion:RestReservacionService) {
    this.user = this.restUser.getUser();
    this.token = this.restUser.getToken();
    this.uri = CONNECTION.URI;
   }

  ngOnInit(): void {
    this.libros = localStorage.getItem('libros');
    this.verLibros();
    this.libro;
    this.libroSelected = JSON.parse(localStorage.getItem('libroSelected'));
    this.libro = new Libro('','','','','','','','','',null,'',null,null,null);
    this.user = this.restUser.getUser();
  }

  verLibros(){
    this.restLibro.getLibros().subscribe((res:any)=>{
      if(res){
        this.libros = res.libros;
        this.librosNuscar = res.libros;
        localStorage.setItem('libros', this.libros);
        localStorage.setItem('librosBuscar', JSON.stringify(this.librosNuscar))
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

  subirImagen(){
    this.uploadImage.fileRequestCine(this.user._id, this.libro._id,[],this.filesToUpload,this.token, 'image')
      .then((res:any)=>{
        if(res.libro){
          this.libro.image = res.libroImage;
          this.libro = res.libro;
          localStorage.setItem('libros', JSON.stringify(this.libro));
          alert('Imagen de libro subida con exito');
          this.refreshPage();
        }else{
          alert('imagen subida')
        }
      },
      error => console.log(<any>error)
      )
  }

  fileChange(fileInput){
    this.filesToUpload = <Array<File>>fileInput.target.files;
    console.log(this.filesToUpload)
  }

  reservar(){
    this.restReservacion.reservar(this.user._id, this.libro._id).subscribe((res:any)=>{
      if(res.pushed){
        delete res.pushed.password;
        alert(res.message);
        this.user = res.pushed;
        localStorage.setItem('user', JSON.stringify(res.pushed));
        this.refreshPage();
      }else{
        alert(res.message)
      }
    },
    (error:any) => alert(error.error.message)
    )
  }

  deleteLibro(){
    this.restLibro.deleteLibro(this.user._id,this.libro._id).subscribe((res:any)=>{
      if(res.libroDeleted){
        alert(res.message);
        this.refreshPage();
      }else{
        alert(res.message);
        this.refreshPage();
      }
    },
    (error:any) => alert(error.error.message)
    )
  }

  updateLibro(){
    this.restLibro.updateLibro(this.user._id, this.libro).subscribe((res:any)=>{
      if(res.libroUpdated){
        alert(res.message);
        localStorage.setItem('libroSelected', JSON.stringify(res.libroUpdated));
      }else{
        this.message = res.message;
      }
    },
    (error:any) => this.message = error.error.message
    )
  }

}
