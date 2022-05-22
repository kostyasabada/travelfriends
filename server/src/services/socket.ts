import { inject, injectable } from 'inversify';
import { Server } from 'socket.io';
import { IUserService } from './user';
import { TYPES } from '@types';
import User from 'src/database/models/user';
import { MessageIterface } from 'src/interfaces/message.interface';

export interface ISocketService {
  socket: any;
  createSocketServer(server:any): any;
}

@injectable()
class SocketService implements ISocketService {
  socket: any
  private _userService: IUserService;

  public constructor(
    @inject(TYPES.UserService) userService: IUserService,
  ) {
    this._userService = userService;
  }

  public async createSocketServer(server: any) {
    const io = new Server(server,
      {
        path: '/socket'
      },
      
    );

    console.log('SocketServer');

    const fetchedUsers = await User.find();

    let users = fetchedUsers.map(user => {
      return {
        name: user.name,
        email: user.email,
        online: false
      }
    })

    let sessionsMap: any = {}

    this.socket = io.on('connection', (userSocket: any) => {

      console.log('IO Connected');

      userSocket.on('user_login', async (credentials: any) => {
        const user = await this._userService.loginUser(credentials);
        if(!user) {
          userSocket.emit('user_not_found', 'user_not_found');
          return;
        }

        userSocket.userId = user.name;
        users = users.map((man) => {
          if (man.name === user.name) {
            return {
              ...man,
              online: true,
              socketId: userSocket.id
            }
          } else {
            return man
          }
        });


        userSocket.emit('user_is_loginned', user);
        this.socket.emit('got_user_list', users);

        sessionsMap[user.name] = userSocket.id;

      })



      userSocket.on('get_user_list', async () => {
        userSocket.emit('got_user_list', users)
      })

      userSocket.on('user_logout', (userName: string) => {
        users = users.map((man) => {
          if (man.name === userName) {
            return {
              ...man,
              online: false,
              socketId: null
            }
          } else {
            return man
          }
        });
      });


      userSocket.on('disconnect', async () => {

        users = users.map((man) => {
          if (man.name === userSocket.userId) {
            return {
              ...man,
              online: false,
              socketId: null
            }
          } else {
            return man
          }
        });

        this.socket.emit('got_user_list', users);
      });


      userSocket.on('send_message', (message: MessageIterface) => {
        this.socket.to(sessionsMap[message.receiver]).emit('get_message', message);
      })

    });

  }

}

export { SocketService };