import { Component, OnInit } from '@angular/core';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';
import { User } from 'src/app/models/user';

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
        alert(res.message);
        this.refreshPage();
      }else{
        alert(res.message)
      }
    },
    (error:any) => alert(error.error.message)
    )
  }

  updateUser(){
    this.restUser.updateUser(this.user).subscribe((res:any)=>{
      if(res.userUpdated){
        alert(res.message);
        this.refreshPage();
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
