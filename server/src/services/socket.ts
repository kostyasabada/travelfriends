import { inject, injectable } from 'inversify';
import { Server } from 'socket.io';
import { IUserService } from './user';
import { TYPES } from '@types';
import User from 'src/database/models/user';

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

    console.log('SocketServer::::');

    const fetchedUsers = await User.find();

    let users = fetchedUsers.map(user => {
      return {
        name: user.name,
        emai: user.email,
        online: false
      }
    })
    
    this.socket = io.on('connection', (userSocket: any) => {

      console.log('IO Connected');

      userSocket.on('user_login', async (credentials:any) => {
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
              online: true
            }
          } else {
            return man
          }
        });


        userSocket.emit('user_is_loginned', user);
        this.socket.emit('got_user_list', users);
      })



      userSocket.on('get_user_list', async () => {
        userSocket.emit('got_user_list', users)
      })

      userSocket.on('user_logout', (userName: string) => {
        users = users.map((man) => {
          if (man.name === userName) {
            return {
              ...man,
              online: false
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
              online: false
            }
          } else {
            return man
          }
        });

        this.socket.emit('got_user_list', users);
      });

    });

  }

}

export { SocketService };