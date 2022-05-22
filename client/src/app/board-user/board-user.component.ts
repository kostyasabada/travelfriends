import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css']
})
export class BoardUserComponent implements OnInit {
  users?: any;
  currentUser: any
  selectedUser: any = null;


  chatData: Array<any> = [];
  message?: String;
  messageObj: any;

  constructor(
    private token: TokenStorageService,
    private userService: UserService,
    private socket: Socket
    ) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();

    this.userService.userList();

    this.userService.onlineUsersSubject.subscribe(
      (data: any) => {
        console.log(data);
        // window.location.reload();
        if (data) {
          this.users = data.filter((user:any) => user.name !== this.currentUser.name)

        } else {
          // this.errorMessage = 'Not found';
          // this.isLoginFailed = true;
        }

      }
    );

    this.socket.on('get_message', (message: any) => {
      this.chatData.push(message);
    })
  }


  onUserSelect(connectedUser: any) {
    this.selectedUser = connectedUser;
  }

  onEnter(selectedUseName: any, message: any, socketId: string) {

    this.messageObj = {
      message,
      sender: this.currentUser.name,
      reciever: selectedUseName,
      date: Date.now()
    }

    console.log(this.messageObj);
    this.chatData?.push(this.messageObj)

    this.userService.sendMessage(this.messageObj);

    this.message = '';
  }
}
