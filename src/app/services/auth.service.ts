import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {subscribeToPromise} from "rxjs/internal-compatibility";
import {AppStateService} from "./app-state.service";
import {jwtDecode} from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient,private appState:AppStateService) { }
  /*login(username:string,password:string){
    return this.http.get("http://localhost:5555/users/"+username)
  }*/
  async login(username:string,password:string){
    let user:any=await this.http.get("http://localhost:5555/users/"+username).toPromise();
    // dans la version rxjs7 firstValueFrom <==> toPromise
    // pour apgrade npm install
    if(password==atob(user.password)){
      let decodeJWT:any=jwtDecode(user.token);
      this.appState.setAuthState({
       // username:user.id, mais il faut utiliser le JWT le décoder
        isAuthenticated:true,
        username:decodeJWT.sub,
        roles:decodeJWT.roles,
        token:user.token
      });
      return Promise.resolve(true);
    }
    else {
      return Promise.reject("Bad Credentials")
    }

  }

  authenticateUser(user: any) {

  }
}
