import { Server } from 'socket.io';
    
class SocketServer {
  socket: any
  constructor(server: any) {
    const io = new Server(server);

    // this.socket = io.of('/session').on('connection', (socket: any) => {
    this.socket = io.on('connection', (socket: any) => {

      console.log('IO Connected');
      
      const chatApiInstance = JSON.parse(
        socket.handshake.query.chatApiInstance
      );

      if (chatApiInstance) {
        socket.join(chatApiInstance);
      }
    });

    console.log('this.socket:::::', this.socket);
    
  }

  onNewMessage(chatApiInstance: any, message: any) {
  
    this.socket.to(chatApiInstance).emit('newMessage', JSON.stringify(message));
  }

  onStatusUpdate(chatApiInstance: any, status: any) {

    this.socket.to(chatApiInstance).emit('statusChange', status);
  }
}

export default SocketServer;