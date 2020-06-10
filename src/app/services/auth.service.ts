import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { UsuarioModel } from '../models/usuario.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {  

  private url = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  private apiKey = '$##';
  usertoekn : string;

  constructor( private htt:HttpClient) { 
    this.leerToken();
  }


  logout(){
    localStorage.removeItem('token');
  }

  login( usuario: UsuarioModel){
    const authData = {
      email             : usuario.email,
      password          : usuario.password,
      returnSecureToken : true
    }

    return this.htt.post(
      `${ this.url }signInWithPassword?key=${ this.apiKey }`, 
      authData
    ).pipe( 
      map( resp => {
        //solo el map se ejecuta cuando tiene exito
        this.guardarToken(resp['idToken']);
        return resp;
      })
    );
  }

  nuevoUsuario ( usuario: UsuarioModel ){
    const authData = {
      email             : usuario.email,
      password          : usuario.password,
      returnSecureToken : true
    }

    return this.htt.post(
      `${ this.url }signUp?key=${ this.apiKey }`, 
      authData
    ).pipe( 
      map( resp => {
        //solo el map se ejecuta cuando tiene exito
        this.guardarToken(resp['idToken']);
        return resp;
      })
    )
  }


  private guardarToken( idToken: string) {
    this.usertoekn = idToken;
    localStorage.setItem( 'token', this.usertoekn);
    let hoy = new Date();
    hoy.setSeconds( 3600 );
    localStorage.setItem('expira', hoy.getTime().toString())
  }

  leerToken () {
    if( localStorage.getItem( 'token' )){
      this.usertoekn = localStorage.getItem( 'token');
    }
    else{
      this.usertoekn = ''
    }
    return this.usertoekn;
  }

  estaAutenticado(): boolean{

    if( this.usertoekn.length < 2 ) { 
      return false;
    }

    const expira = Number(localStorage.getItem('expira'));
    const expiraDate = new Date();
    expiraDate.setTime(expira);
    if ( expiraDate > new Date()){
      return true;
    }else{
      return false;
    }
  }

}
