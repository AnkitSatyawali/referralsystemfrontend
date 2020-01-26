import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import API_URL from '../config/URL';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DetailService {
httpOptions;
  constructor(private http:HttpClient,private authService:AuthService,private cookieService:CookieService) { 
  }
  
  getDetails():Observable<any>
  {
    this.httpOptions = {
      
      headers: new HttpHeaders({
  
        'authorization':  this.cookieService.get('authorization')
  
      })
    };
  	return this.http.get<any>(`${API_URL}user/userdetail`,this.httpOptions);
  }
}
