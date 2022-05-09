import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UrlsService } from './urls.service';

// const AUTH_API = 'http://localhost:8080/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private urlsService: UrlsService,
    ) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(this.urlsService.Api.LOGIN, {
      username,
      password
    }, httpOptions);
  }

  register(username: string, email: string, password: string): Observable<any> {
    console.log(username,
      email,
      password);
    
    return this.http.post(this.urlsService.Api.SIGNUP, {
      username,
      email,
      password
    }, httpOptions);
  }
}
