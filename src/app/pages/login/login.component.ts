import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from 'src/app/models/usuario.models';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario:UsuarioModel = new UsuarioModel();
  recordarme = false;

  constructor(private auth:AuthService,private router:Router) { }

  ngOnInit() {
    if (localStorage.getItem('email')) {
      this.usuario.email = localStorage.getItem('email');
      this.recordarme = true;
    }
  }
  login(form: NgForm){
    if(form.invalid){ return;}
    Swal.fire({
      allowOutsideClick: false,
      text: 'Espere porfavor ...',
      icon: 'info',
      confirmButtonText: 'Cool'
    })
    Swal.showLoading();
    this.auth.login(this.usuario).subscribe(
      resp=>{
        console.log(resp);
        Swal.close();
        this.router.navigateByUrl('/home');
        if (this.recordarme) {
          localStorage.setItem('email',this.usuario.email)
        }
      },
      err=>{
        console.log(err.error.error.message);
        Swal.fire({
          title: '!Error al autenticar',
          text: err.error.error.message,
          icon: 'error',
          confirmButtonText: 'Cool'
        })
      }
    );
  }

}
