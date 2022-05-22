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
          this.users = data.filter((user:UserInterface) => user.name !== this.currentUser?.name);
      }
    );

    this.socket.on('get_message', (message: MessageIterface) => {
      this.chatData.push(message);

      if(document.hidden) {
        this.sendNotification(message)
      }
    })
  }

  async sendNotification(message: MessageIterface) {
      if (!("Notification" in window)) {
          return console.error("This browser does not support desktop notification");
      }
      const { permission, requestPermission } = Notification;
      if (permission === "granted" || (permission !== "denied" && (await requestPermission()) === "granted")) {
          const notification = new Notification(`${message.sender}: ${message.message}`);
      }
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
