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
      this.loginnedUserSubject.next(loginedUser);
    })

    this.socket.on('user_not_found', () => {
      this.loginnedUserSubject.next(null)
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
    this.socket.emit('get_user_list');

    this.socket.on('got_user_list', (users: any) => {
      this.onlineUsersSubject.next(users);
    })
  }

  sendMessage(message: any) {
    this.socket.emit('send_message', message)
  }

  logOut(user: any) {
    this.socket.emit('user_logout', user.name)
  }
}
