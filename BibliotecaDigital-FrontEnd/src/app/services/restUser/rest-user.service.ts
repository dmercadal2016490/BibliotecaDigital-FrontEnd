import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { CONNECTION } from '../global'
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestUserService {
  public uri:string
  public httpOptions ={
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };
  
  public httpOptionsAuth ={
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization' : this.getToken()
    })
  }

  public user;
  public token;

  private extractData(res: Response){
    let body = res;
    return body || [] || {};
  }

  constructor(private http: HttpClient) {
    this.uri = CONNECTION.URI;
  }

  getUser(){
    let user = JSON.parse(localStorage.getItem('user'));
    if(user != undefined || user != null){
      this.user = user
    }else{
      this.user = null;
    }
    return this.user;
  }

  getToken(){
    let token = localStorage.getItem('token');
    if(token != undefined || token != null){
      this.token = token;
    }else{
      this.token = null
    }
    return this.token;
  }


  login(user, token){
    user.gettoken = token;
    let params = JSON.stringify(user);
    return this.http.post(this.uri + 'login' , params, this.httpOptions)
      .pipe(map(this.extractData));
  }

  saveUser(user, idAdmin){
    let params = JSON.stringify(user);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    });
    return this.http.post(this.uri + 'saveUser/' + idAdmin, params, {headers:headers})
      .pipe(map(this.extractData));
  }

  getUsers(){
    return this.http.get(this.uri + 'getUsers', this.httpOptions)
      .pipe(map(this.extractData))
  }

  usuarioMasRenta(){
    return this.http.get(this.uri + 'usuarioMasReservas', this.httpOptions)
      .pipe(map(this.extractData))
  }

  deleteUser(idUser){
    return this.http.delete(this.uri + 'deleteUser/' + idUser, this.httpOptions)
      .pipe(map(this.extractData));
  }
}
