import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from 'src/app/models/usuario.models';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  usuario:UsuarioModel;
  recordarme = false;

  constructor(private auth:AuthService, private router:Router) { }

  ngOnInit() {
    this.usuario = new UsuarioModel();
    if (localStorage.getItem('email')) {
      this.usuario.email = localStorage.getItem('email');
      this.recordarme = true;
    }
   }
   onSubmit(form:NgForm){
     if(form.invalid)return;
     this.auth.nuevousuario(this.usuario).subscribe(resp=>{
       console.log(resp);
       this.router.navigateByUrl('/home');
     },(err)=>{
       console.log(err.error.error.message);

     });
   }

}
