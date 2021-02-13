import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostApiService {

  constructor(private http: HttpClient) { }

  postCall(){

    return this.http.get('http://127.0.0.1:3333/mensaje');

  }

}
