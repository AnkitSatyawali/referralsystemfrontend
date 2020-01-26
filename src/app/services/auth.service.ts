import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import {Router} from '@angular/router';
import API_URL from '../config/URL';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router,private http:HttpClient,private cookieService:CookieService) { }

  httpOptions = {
    headers: new HttpHeaders({

      'authorization':  this.getUserToken()

    })
  }

  signupUser(userInput):Observable<any>{
    console.log(userInput);
  	return this.http.post<any>(`${API_URL}userAuth/signup`,{username:userInput.username,email:userInput.email,password:userInput.password,refcode:userInput.refcode});
  }
  loginUser(email,password):Observable<any>{
    console.log(email);
    return this.http.post<any>(`${API_URL}userAuth/login`,{email,password},this.httpOptions);

  }
    setUserTokenToCookie(token){
    
    this.cookieService.set('authorization',token)
    this.httpOptions = {
      
      headers: new HttpHeaders({
  
        'authorization':  this.cookieService.get('authorization')
  
      })
    };
    
  }
  getId(){
    if(this.httpOptions)
    return this.http.get<any>(`${API_URL}userAuth/getId`,this.httpOptions);	
  }

  getUserToken(){
    console.log(this.cookieService.get('authorization'))
    return this.cookieService.get('authorization');
  }
    logout(){
  
    this.deleteUserTokenCookie();
    this.httpOptions = {
      headers: new HttpHeaders({
  
        'authorization':  this.getUserToken()
  
      })
    };
    this.router.navigate(['/']);
  }
    deleteUserTokenCookie(){
    this.cookieService.delete('authorization')
  }
  isUserLoggedIn(route,presentroute){
    this.getId().subscribe(data => {
      console.log(data)
      this.router.navigate([route]);
    },err =>{
      if(presentroute=="/register")
        {console.log(presentroute);
          this.router.navigate(['/register']);}
      else if(presentroute.length>10)
        {console.log(presentroute);
          this.router.navigate([presentroute]);}
      else
        this.router.navigate(['/home']);
    })

    
  }

}
