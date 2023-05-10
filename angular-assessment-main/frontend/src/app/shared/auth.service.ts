import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import {AngularFireAuth} from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import {Authdata} from "../login.model"

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authtoken:any;

  constructor(private http:HttpClient,private router:Router){

  }

  createUser(username:string,password:string,name:string){
      const authData:Authdata={username:username,password:password,name:name}
      this.http.post("http://localhost:3000/signup",authData).subscribe(response=>{
        console.log(response);
      });

  }

  login(username:string,password:string){
    const authData:Authdata={username:username,password:password};
    this.http.post("http://localhost:3000/login",authData).subscribe((response:any)=>{
      console.log("login",response);
      this.authtoken=response["token"];
      console.log("login",response["token"]);

      // let authtoken=response['token']
      localStorage.setItem('username',JSON.stringify(username));
      if(response){
        this.router.navigate(['video'])
      }
    })

  }
}
