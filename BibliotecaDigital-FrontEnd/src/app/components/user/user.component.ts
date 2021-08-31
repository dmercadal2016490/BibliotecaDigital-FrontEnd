import { Component, OnInit } from '@angular/core';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';
import { CONNECTION } from 'src/app/services/global';
import { UploadImageService } from 'src/app/services/uploadImage/upload-image.service';
import { Router } from '@angular/router';

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
          alert('Imagen subida con exito');
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
        alert(res.message);
        localStorage.clear()
        this.router.navigateByUrl('index');
      }else{
        alert(res.message)
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
        alert(res.message);
        this.user = res.userUpdated;
        localStorage.setItem('user', JSON.stringify(res.userUpdated))
      }else{
        alert(res.message);
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
