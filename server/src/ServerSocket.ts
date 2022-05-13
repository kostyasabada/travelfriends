
import { Server } from 'socket.io';
    
class SocketServer {
  socket: any
  constructor(server: any) {
    const io = new Server(server,
      {
        path: '/socket',

        // cors: {
        //   origin: '*',
        //   methods: ["GET", "POST"],
        //   allowedHeaders: ['Access-Control-Allow-Origin'],
        //   credentials: false
        // },
        // allowEIO3: true
      },
      
    );

    console.log('SocketServer::::');
    
    this.socket = io.on('connection', (socket: any) => {

      console.log('IO Connected');

      socket.emit('newMessage', {
        text: 'WHAT'
      })
    });

  }

  // onNewMessage(chatApiInstance: any, message: any) {
  
  //   this.socket.to(chatApiInstance).emit('newMessage', JSON.stringify(message));
  // }

  // onStatusUpdate(chatApiInstance: any, status: any) {

  //   this.socket.to(chatApiInstance).emit('statusChange', status);
  // }
}

export default SocketServer;