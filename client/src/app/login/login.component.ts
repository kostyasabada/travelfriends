import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';

import { UserService } from '../_services/user.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(
    private userService: UserService,
    private tokenStorage: TokenStorageService,
    private socket: Socket
  ) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  onSubmit(): void {
    const { username, password } = this.form;

    this.userService.login(username, password)

    this.userService.loginnedUserSubject.subscribe(
      (data: any) => {
        if (data) {
          this.tokenStorage.saveToken(data.accessToken);
          this.tokenStorage.saveUser(data);
          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.reloadPage();
        } else {
          this.errorMessage = 'Not found';
          this.isLoginFailed = true;
        }

      }
    );



  }

  reloadPage(): void {
    window.location.reload();
  }
}
