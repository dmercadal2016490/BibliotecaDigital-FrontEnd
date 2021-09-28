import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { CONNECTION } from '../global'
import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestLibroService {
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
  public libro;

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

  getLibros(){
    return this.http.get(this.uri + '/getLibros', this.httpOptions)
      .pipe(map(this.extractData))
  }

  agregarCopias(idUser, idLibro, libro){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    })

    let params = JSON.stringify(libro);
    return this.http.put(this.uri +idUser + '/agregarCopias/'+idLibro,params,{headers:headers})
      .pipe(map(this.extractData))
  }

  quitarCopias(idUser, idLibro, libro){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    })
    let params = JSON.stringify(libro);
    return this.http.put(this.uri +idUser + '/quitarCopias/'+idLibro,params,{headers:headers})
      .pipe(map(this.extractData))
  }

  libroMasRentado(){
    return this.http.get(this.uri + 'libroMasRentado' , this.httpOptions)
      .pipe(map(this.extractData))
  }

  libroMenosRentado(){
    return this.http.get(this.uri + 'libroMenosRentado' , this.httpOptions)
      .pipe(map(this.extractData))
  }

  revistaMasRentada(){
    return this.http.get(this.uri + 'RevistaMasRentada' , this.httpOptions)
      .pipe(map(this.extractData))
  }

  revistaMenosRentada(){
    return this.http.get(this.uri + 'RevistaMenosRentada' , this.httpOptions)
      .pipe(map(this.extractData))
  }

  librosAgotados(){
    return this.http.get(this.uri + 'librosAgotados' , this.httpOptions)
      .pipe(map(this.extractData))
  }

  addLibro(idUser, libro){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    })
    let params = JSON.stringify(libro);
    return this.http.post(this.uri + 'addLibro/' + idUser, params, {headers:headers})
      .pipe(map(this.extractData));
  }

  deleteLibro(idUser, idLibro){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    })
    return this.http.delete(this.uri + idUser + '/deleteLibro/'+ idLibro, {headers:headers})
      .pipe(map(this.extractData))
  }

  updateLibro(idUser, libro){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    })
    let params = JSON.stringify(libro);
    return this.http.put(this.uri + idUser + '/updateLibro/' + libro._id, params, {headers:headers})
      .pipe(map(this.extractData));
  }

  search(libroBuscar){
    let params = JSON.stringify(libroBuscar);

    return this.http.put(this.uri +'search', params, this.httpOptions)
      .pipe(map(this.extractData))
  }

  getConsulta(){
    let libro = JSON.parse(localStorage.getItem('consulta'));
    if(libro != undefined || libro != null){
      this.libro = libro
    }else{
      this.libro = null;
    }
    return this.libro;
  }
}
