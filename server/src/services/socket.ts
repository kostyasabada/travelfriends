import { inject, injectable } from 'inversify';
import { Server } from 'socket.io';
import { IUserService } from './user';
import { TYPES } from '@types';

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

    // const onlineUsers = [] as any;

    console.log('SocketServer::::');
    
    this.socket = io.on('connection', (socket: any) => {

      console.log('IO Connected');

      socket.on('user_login', async (credentials:any) => {
        const user = await this._userService.loginUser(credentials);
        if(!user) {
          socket
        }

        socket.emit('user_is_loginned', user)
        // const updatedOnlineUsers = [...onlineUsers, user]
        // console.log('46onlineUsers:::', updatedOnlineUsers);
        
        // socket.emit('onlineUsers', updatedOnlineUsers)
      })

    });

  }

}

export { SocketService };