import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private auth:AuthService, private router:Router ) {}

  canActivate(): boolean {
    console.log('guard');
    
    if( this.auth.estaAutenticado()) {
      return true;
    }else{
      this.router.navigate(['/login']);
      return false;
    }
  }
  
}
