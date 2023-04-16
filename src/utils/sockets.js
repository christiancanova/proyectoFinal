export default (io)=>{
    io.on('connection', (socket) => {
      //recibir un nuevo mensaje enviandolo a todos los clientes conectados
      socket.on('addMessage',(message)=>{
        io.sockets.emit('addMessage',message);
      })
    });
  }