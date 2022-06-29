import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import {Peer, MediaConnection} from 'peerjs';
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
  peer: any;
  @ViewChild('localVideo') localVideo!: ElementRef<HTMLVideoElement>;
  @ViewChild('remoteVideo') remoteVideo!: ElementRef<HTMLVideoElement>;
  mediaCall!: MediaConnection

  constructor(
    private token: TokenStorageService,
    private userService: UserService,
    private socket: Socket
    ) { }

  ngOnInit() {
    this.currentUser = this.token.getUser();

    //PeerJS wraps the browser's WebRTC implementation to provide a complete, configurable, and easy-to-use peer-to-peer connection API. Equipped with nothing but an ID, a peer can create a P2P data or media stream connection to a remote peer.

    this.peer = new Peer(
      `${this.currentUser?.name}`, {
      host: 'localhost',
      port: 4200,
      path: '/peerjs'
    });

    this.socket.on('video_request', async (remotePeerId:string) => {
      // The Navigator.mediaDevices read-only property returns a MediaDevices object, which provides access to connected media input devices like cameras and microphones, as well as screen sharing.
      const stream = await navigator.mediaDevices.getUserMedia({video: true, audio: false});

      this.peer.connect(remotePeerId);

        // Start a data connection by calling peer.connect with the peer ID of the destination peer.
      // this.peer.connect(remotePeerId);

      // Call a peer, providing our mediaStream
      this.mediaCall = this.peer.call(remotePeerId, stream);
  
      // Here you'd add `stream` to an HTML video element.
      this.localVideo.nativeElement.srcObject = stream;

        	//receive the `stream` is the MediaStream of the remote peer.
      this.mediaCall.on('stream', (remoteStream) => {

          	 // Here you'd add `stream` to an HTML video element.
        this.remoteVideo.nativeElement.srcObject = remoteStream;
      });
 
    })

    this.userService.userList();

    this.userService.onlineUsersSubject.subscribe(
      (data: any) => {
        if(data) {
          this.users = data.filter((user:UserInterface) => user.name !== this.currentUser?.name);
        }
      }
    );

    this.socket.on('get_message', (message: MessageIterface) => {
      this.chatData.push(message);

      if(document.hidden) {
        this.sendNotification(message)
      }
    })
  }

  async startVideo() {
    const stream = await navigator.mediaDevices.getUserMedia({ video: false, audio: true });
    this.localVideo.nativeElement.srcObject = stream;

    this.socket.emit('video_connect', {sender: this.currentUser?.name, receiver: this.selectedUser?.name});

    //now going to server and check, then to oninit it receive


      //we shoul receive on call
    this.peer.on('call', async (call: any) => {

        this.mediaCall = call;
    // Answer the call by providing our mediaStream
        this.mediaCall.answer(stream);

        	//receive the `stream` is the MediaStream of the remote peer.
        this.mediaCall.on('stream', (remoteStream) => {
          	 // Here you'd add `stream` to an HTML video element.
          this.remoteVideo.nativeElement.srcObject = remoteStream;
        });
    });

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
