import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { MessageIterface } from '../interfaces/message.intraface';
import { UserInterface } from '../interfaces/user.interface';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css']
})
export class BoardUserComponent implements OnInit {
  users?: UserInterface[];
  currentUser: UserInterface | null = null
  selectedUser: UserInterface | null = null;


  chatData: Array<any> = [];
  message?: String;
  messageObj?: MessageIterface;

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
        if (data) {
          this.users = data.filter((user:UserInterface) => user.name !== this.currentUser?.name)

        } else {
          // this.errorMessage = 'Not found';
          // this.isLoginFailed = true;
        }

      }
    );

    this.socket.on('get_message', (message: MessageIterface) => {
      this.chatData.push(message);
    })
  }


  onUserSelect(connectedUser: UserInterface) {
    this.selectedUser = connectedUser;
  }

  onEnter(selectedUseName: string, message: any) {

    this.messageObj = {
      message,
      sender: (this.currentUser as UserInterface).name,
      receiver: selectedUseName,
      date: Date.now()
    }

    this.chatData?.push(this.messageObj)

    this.userService.sendMessage(this.messageObj);

    this.message = '';
  }
}
