import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { UrlsService } from './urls.service';
import { Socket } from 'ngx-socket-io';
import { UserInterface } from '../interfaces/user.interface';
import { MessageIterface } from '../interfaces/message.intraface';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  loginnedUserSubject = new BehaviorSubject<UserInterface | null>(null);
  onlineUsersSubject = new BehaviorSubject<UserInterface[] | null>(null);


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

    this.socket.on('user_is_loginned', (loginedUser:  UserInterface) => {
      this.loginnedUserSubject.next(loginedUser);
    })

    this.socket.on('user_not_found', () => {
      this.loginnedUserSubject.next(null)
    })

  }

  register(username: string, email: string, password: string): Observable<UserInterface> {
    return this.http.post<UserInterface> (this.urlsService.Api.SIGNUP, {
      username,
      email,
      password
    });
  }

  userList() {
    this.socket.emit('get_user_list');

    this.socket.on('got_user_list', (users: UserInterface[]) => {
      this.onlineUsersSubject.next(users);
    })
  }

  sendMessage(message: MessageIterface) {
    this.socket.emit('send_message', message)
  }

  logOut(user: UserInterface) {
    this.socket.emit('user_logout', user.name)
  }
}
