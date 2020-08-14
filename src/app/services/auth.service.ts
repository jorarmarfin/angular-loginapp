import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.models';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Crear nuevo usuario
  //https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]
  // login
  //https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]
  private url = 'https://identitytoolkit.googleapis.com/v1';
  private apikey = 'AIzaSyCdznxypNPeZ9Wo9U2B8pyoBzjtycmjdVM';
  userToken:string;

  constructor(private http:HttpClient) { 
    this.leerToken();
  }
  logout(){

  }
  login(usuario:UsuarioModel){
    const authData = {
      ...usuario,
      returnSecureToken: true
    }
    return this.http.post(
      `${this.url}/accounts:signInWithPassword?key=${this.apikey}`,
      authData
      ).pipe(//Este pipe se ejecutara solo si el servicio tienen exito
        map(resp=>{
          this.guardarToken(resp['idToken']);
          return resp;
        })
      );

  }
  nuevousuario(usuario:UsuarioModel){
    const authData = {
      email: usuario.email,
      password: usuario.password,
      returnSecureToken: true
    }
    // Es otra forma
    // const authData = {
    //   ...usuario,
    //   returnSecureToken: true
    // }
    return this.http.post(
      `${this.url}/accounts:signUp?key=${this.apikey}`,
      authData
      ).pipe(//Este pipe se ejecutara solo si el servicio tienen exito
        map(resp=>{
          this.guardarToken(resp['idToken']);
          return resp;
        })
      );

  }
  private guardarToken(idToken:string){
    this.userToken = idToken;
    localStorage.setItem('token',idToken);
  }

  leerToken(){
    if (localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token');
    }else{
      this.userToken = '';
    }
    return this.userToken;
  }



}
