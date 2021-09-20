import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { CONNECTION } from '../global'
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestReservacionService {
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

  reservar(idUser, idLibro){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    })
    return this.http.put(this.uri + idUser + '/reservar/' + idLibro,null,{headers:headers})
      .pipe(map(this.extractData))
  }

  devolver(idUser,idLibro){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    })
    return this.http.put(this.uri + idUser + '/devolver/' + idLibro,null,{headers:headers})
      .pipe(map(this.extractData))
  }

  limpiarHistorial(idUser){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    })
    return this.http.put(this.uri +'cleanHistoria/' +idUser, null,{headers:headers})
      .pipe(map(this.extractData))
  }
}
