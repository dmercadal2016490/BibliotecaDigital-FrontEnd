import { Component, OnInit } from '@angular/core';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';
import { User } from '../../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user:User;
  token:string;
  userLogged;
  message;

  constructor(private restUser: RestUserService, private router:Router) { 
    this.user = new User('','','','','','','','','',null,[])
  }

  ngOnInit(): void {
  }

  onSubmit(){
    this.restUser.login(this.user, 'true').subscribe((res:any)=>{
      this.message = res.message;
      if(!res.token){
        alert(res.message);
      }else{
        this.userLogged = res.user;
        this.token = res.token;
        delete this.userLogged.password;

        if(this.token.length <= 0){
          alert('El token no se genero correctamente');
        }else{
          localStorage.setItem('token', this.token);
          localStorage.setItem('user', JSON.stringify(this.userLogged));
          alert('Usuario logeado correctamente')
          this.router.navigateByUrl('home')
        }
      }
    },
      (error:any) => this.message = error.error.message
    )
  }

}
