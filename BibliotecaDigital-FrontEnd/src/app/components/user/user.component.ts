import { Component, OnInit } from '@angular/core';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';
import { CONNECTION } from 'src/app/services/global';
import { UploadImageService } from 'src/app/services/uploadImage/upload-image.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  uri;
  user;
  public filesToUpload:Array<File>;
  token;

  constructor(private restUser:RestUserService, private uploadUser:UploadImageService, private router:Router) {
    this.uri = CONNECTION.URI;
    this.user = restUser.getUser();
    this.token = restUser.getToken();
  }

  ngOnInit(): void {
  }

  uploadImage(){
    this.uploadUser.fileRequest(this.user._id, [], this.filesToUpload, this.token, 'image')
      .then((res:any)=>{
        if(res.user){
          this.user.image = res.userImage;
          localStorage.setItem('user', JSON.stringify(this.user));
          Swal.fire(
            'Exito',
            'Imagen subida con exito',
            'success',
          )
        }else{
          alert(res.message)
        }
      })
  }

  fileChange(fileInput){
    this.filesToUpload = <Array<File>>fileInput.target.files;
    console.log(this.filesToUpload)
  }

  deleteUser(){
    this.restUser.deleteUser(this.user._id).subscribe((res:any)=>{
      if(res.userDeleted){
        Swal.fire(
          'Eliminado',
          res.message,
          'success',
        )
        localStorage.clear()
        this.router.navigateByUrl('index');
      }else{
        Swal.fire(
          'Error',
          res.message,
          'error'
        )
      }
    },
    (error:any) => alert(error.error.message)
    )
  }

  updateUser(){
    delete this.user.password;
    delete this.user.role;
    this.restUser.updateUser(this.user).subscribe((res:any)=>{
      if(res.userUpdated){
        delete res.userUpdated.password;
        Swal.fire(
          'Actualizado',
          res.message,
          'success',
        )
        this.user = res.userUpdated;
        localStorage.setItem('user', JSON.stringify(res.userUpdated))
      }else{
        Swal.fire(
          'Error',
          res.message,
          'error'
        )
        this.user = this.restUser.getUser();
      }
    },
    (error:any)=> alert(error.error.message)
    )
  }

  refreshPage() {
    window.location.reload();
  }
}
