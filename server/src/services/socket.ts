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
        userSocket.userId = user.name;
        if(!user) {
          userSocket
        }
        users = users.map((man) => {
          if (man.name === user.name) {
            return {
              ...man,
              online: true
            }
          } else {
            return man
          }
        })


        userSocket.emit('user_is_loginned', user);

        this.socket.emit('got_user_list', users)
      })



      userSocket.on('get_user_list', async () => {

        userSocket.emit('got_user_list', users)
      })


      userSocket.on('disconnect', async (event: any) =>{
        console.log('user disconnected', userSocket.userId);
      });

    });

  }

}

export { SocketService };