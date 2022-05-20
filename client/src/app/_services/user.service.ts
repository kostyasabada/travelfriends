import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { UrlsService } from './urls.service';
import { Socket } from 'ngx-socket-io';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  loginnedUserSubject: BehaviorSubject<any> = new BehaviorSubject(null);
  onlineUsersSubject: BehaviorSubject<any> = new BehaviorSubject(null);


  constructor(
    private http: HttpClient,
    private urlsService: UrlsService,
    private socket: Socket
    ) { }

  login(username: string, password: string) {
    this.socket.emit('user_login', {
      username,
      password
    });

    this.socket.on('user_is_loginned', (loginedUser: any) => {
      console.log(1);
      
      this.loginnedUserSubject.next(loginedUser);
    })

  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(this.urlsService.Api.SIGNUP, {
      username,
      email,
      password
    }, httpOptions);
  }

  userList() {
    // return this.http.get(this.urlsService.Api.USERLIST);
    this.socket.emit('get_user_list');

    this.socket.on('got_user_list', (users: any) => {
      this.onlineUsersSubject.next(users);
    })
  }
}
