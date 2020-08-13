import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.models';

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

  constructor(private http:HttpClient) { }
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
      );

  }
}
