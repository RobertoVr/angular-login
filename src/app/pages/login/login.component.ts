import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

import { UsuarioModel } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  usuario     : UsuarioModel;
  recordarme  : boolean = false;

  constructor( private auth:AuthService, private router:Router) { }

  ngOnInit() {
    this.usuario = new UsuarioModel();
    if(localStorage.getItem('email')){
      this.usuario.email = localStorage.getItem('email');
      this.recordarme = true;
    }

  }

  login( form: NgForm){
    if ( form.invalid ) { return; }

    Swal.fire( { 
      allowOutsideClick: false,
      text: 'Espere por favor....',
      icon: 'info'
    })
    Swal.showLoading();
  
    this.auth.login( this.usuario ).subscribe(( resp ) => {
      //console.log( resp );
      Swal.close();

      if(this.recordarme){
        localStorage.setItem('email', this.usuario.email);
      }


      this.router.navigate(['/home']);
    },( err ) => {
      //console.log( err.error.error.message )
      Swal.fire( {
        title: 'Error al autenticar',
        text: err.error.error.message,
        icon: 'error'
      })
    })
  }


}
