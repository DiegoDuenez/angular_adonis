import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { User } from '../models/user';
import {IResponse} from '../models/i-response';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from '../models/producto';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiURL = environment.apiURL;
  httpheaders: HttpHeaders = new HttpHeaders();

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) { 
    this.httpheaders.append("Content-Type","aplication/json")
    this.httpheaders.append("Authorization","Bearer" + localStorage.getItem('token'))

   }

  registro(user: User):Observable<any>{
    return this.http.post(`${this.apiURL}registro`, user);
  }

  login(user: User):Observable<any>{
    return this.http.post(`${this.apiURL}login`, user);
  }

  logout(){
    localStorage.removeItem('token')
    console.log("token remove")
    this.router.navigate(['/login']);
  }

  perfil(user: User):Observable<any>{
    
    let httpheaders: HttpHeaders = new HttpHeaders();
    const token = localStorage.getItem('token');
    console.log('get token', token);

    httpheaders = httpheaders.append('Authorization', 'Bearer' + localStorage.getItem('token'));

    return this.http.get(`${this.apiURL}perfil`);
    
  }

  usuarios(id: Number = 0){
    if(id == 0){
      return this.http.get(`${this.apiURL}usuarios`);
    }
    else{
      return this.http.get(`${this.apiURL}usuarios/`+ id);
    }
    
  }

  productos(id: Number = 0){
    
    if(id == 0){
      return this.http.get(`${this.apiURL}productos`);
    }
    else{
      return this.http.get(`${this.apiURL}productos/`+ id);
    }
  }

  misProductos(id: Number){
    return this.http.get(`${this.apiURL}productos/usuario/` + id)
  }

  productosUsuario(id: Number){
    return this.http.get(`${this.apiURL}productos/usuario/` + id)
  }

  comentarios(){
    
    
      return this.http.get(`${this.apiURL}comentarios`)
    
    
  }

  comentariosProducto(id: Number){

    return this.http.get(`${this.apiURL}comentarios/producto/` + id)

  }

  comentariosUsuario(id: Number){
    return this.http.get(`${this.apiURL}comentarios/usuario/` + id)
  }



  


}
