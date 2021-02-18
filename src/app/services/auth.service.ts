import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { User } from '../models/user';
import { IResponse } from '../models/i-response';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from '../models/producto';
import { Comentario } from '../models/comentario';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class AuthService {

  apiURL = environment.apiURL;
  httpheaders: HttpHeaders = new HttpHeaders();
  private _refresh$ = new Subject<void>();

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.httpheaders.append('Content-Type', 'aplication/json');
    this.httpheaders.append(
      'Authorization',
      'Bearer' + localStorage.getItem('token')
    );
  }

  get refresh$(){
    return this._refresh$;
  }
  
//registrar persona
  registro(user: User): Observable<any> {
    return this.httpClient.post(`${this.apiURL}registro`, user);
  }
//registrar producto
  registroProduct(productos: Producto): Observable<any> {
    return this.httpClient.post(`${this.apiURL}registrar/productos`, productos);
  }

  //actualizxar producto
  actualizarProduct(productos: Producto, id: Number): Observable<any> {
    return this.httpClient.put(`${this.apiURL}actualizar/productos/`+id, productos);
  }

  //comentarios actualizar
  comentariosActualizar(comentario: Comentario,id: Number): Observable<any>  {
    return this.httpClient.put(`${this.apiURL}actualizar/comentarios/`+id,comentario);
  }

  //registrar comentarios
  comentariosNew(comentar: Comentario): Observable<any> {
    return this.httpClient.post(`${this.apiURL}registrar/comentarios`,comentar);
  }


//loggin
  login(user: User): Observable<any> {
    return this.httpClient.post(`${this.apiURL}login`, user);
  }

//loggedIn
  loggedIn(){
    return !!
    localStorage.getItem('token')
  }

//loggOut
  logout() {
    localStorage.removeItem('token');
    console.log('token remove');
    this.router.navigate(['/login']);
    return this.httpClient.delete(`${this.apiURL}logout`)
  }

//ver perfil
  perfil(user: User): Observable<any> {
    let httpheaders: HttpHeaders = new HttpHeaders();
    const token = localStorage.getItem('token');
    
    httpheaders = httpheaders.append(
      'Authorization',
      'Bearer' + localStorage.getItem('token')
    );
    return this.httpClient.get(`${this.apiURL}perfil`);
  }
  
//registrar productos
  registrarProductos(user: User): Observable<any> {
    let httpheaders: HttpHeaders = new HttpHeaders();
    const token = localStorage.getItem('token');
   
    httpheaders = httpheaders.append(
      'Authorization',
      'Bearer' + localStorage.getItem('token')
    );
    return this.httpClient.get(`${this.apiURL}registrar/productos`);
  }

  usuarios(id: Number = 0) {
    if (id == 0) {
      return this.httpClient.get(`${this.apiURL}usuarios`);
    } else {
      return this.httpClient.get(`${this.apiURL}usuarios/` + id);
    }
  }

  productos(id: Number = 0) {
    if (id == 0) {
      return this.httpClient.get(`${this.apiURL}productos`);
    } else {
      return this.httpClient.get(`${this.apiURL}productos/` + id);
    }
  }

  misProductos(id: Number) {
    return this.httpClient.get(`${this.apiURL}productos/usuario/` + id)
  }

  productosUsuario(id: Number) {
    return this.httpClient.get(`${this.apiURL}productos/usuario/` + id);
  }

  //mostrar comentarios
  comentarios() {
    return this.httpClient.get(`${this.apiURL}comentarios`);
  }

  //comentarios por producto
  comentariosProducto(id: Number) {
    return this.httpClient.get(`${this.apiURL}comentarios/producto/` + id);
  }
  //comentarios por usuario
  comentariosUsuario(id: Number) {
    return this.httpClient.get(`${this.apiURL}comentarios/usuario/` + id);
  }

  deletecomentario(id: Number) {
    return this.httpClient.delete(`${this.apiURL}borrar/comentarios/` + id);
  }

  deleteproducto(id: Number) {
    //return this.httpClient.delete(`${this.apiURL}borrar/comentarios/`)
    
    return this.httpClient.delete(`${this.apiURL}borrar/productos/` + id)
   
    
    
    
  }

}
