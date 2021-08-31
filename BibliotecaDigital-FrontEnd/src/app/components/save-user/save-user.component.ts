import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-save-user',
  templateUrl: './save-user.component.html',
  styleUrls: ['./save-user.component.css']
})
export class SaveUserComponent implements OnInit {
  public user:User
  public username: string;
  message;
  message2;
  public usuario;
  public token;
  public optionsRol = ['ROLE_ADMIN', 'ROLE_USER', 'ROLE_BIBLIOTECARIO'];

  constructor(private restUser:RestUserService, private router:Router) {
    this.user = new User('','','','','','','','','',null,[]);
    this.token = restUser.getToken();
    this.usuario = restUser.getUser()
  }

  ngOnInit(): void {
  }

  onSubmit(statusForm){
    this.restUser.saveUser(this.user, this.usuario._id).subscribe((res:any)=>{
      if(res.userSaved){
        alert(res.message);
        statusForm.reset();
        this.user = new User('','','','','','','','','',null,[]);
        this.router.navigateByUrl('home');
      }else{
        this.message = res.message;
        this.message2 = res.Usuario;
      }
    },
    (error:any) => this.message = error.error.message
    )
  }

}
