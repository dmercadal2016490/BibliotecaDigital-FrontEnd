import { Component, OnInit } from '@angular/core';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';
import { User } from 'src/app/models/user';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {
  users;
  user:User;
  userSelected:User;
  admin;
  message;
  public optionsRol = ['ROLE_ADMIN', 'ROLE_USER', 'ROLE_BILBIOTECARIO'];

  constructor(private restUser:RestUserService) {
    this.admin = restUser.getUser();
  }

  ngOnInit(): void {
    this.listUsers();
    this.user = new User('','','','','','','','','',null,[]);
    this.users = localStorage.getItem('users');
  }

  listUsers(){
    this.restUser.getUsers().subscribe((res:any)=>{
      if(res.users){
        this.users = res.users;
        localStorage.setItem('users', JSON.stringify(this.users));
      }else{
        alert(res.message);
      }
    },
    (error:any) => alert(error.error.message)
    )
  }

  obetenerData(selectedUser){
    this.user = selectedUser;
    localStorage.setItem('userSelected', JSON.stringify(selectedUser)) ;
  }

  deleteUser(){
    this.restUser.deleteUser(this.user._id).subscribe((res:any)=>{
      if(res.userDeleted){
        Swal.fire(
          'Eliminado',
          res.message,
          'success',
        ).then(this.refreshPage)
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
    this.restUser.updateUser(this.user).subscribe((res:any)=>{
      if(res.userUpdated){
        Swal.fire(
          'Actualizado',
          res.message,
          'success',
        )
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

  refreshPage() {
    window.location.reload();
  }

}
