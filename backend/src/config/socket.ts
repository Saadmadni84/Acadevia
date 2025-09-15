import { Server as HTTPServer } from 'http'
import { Server as SocketIOServer } from 'socket.io'

let io: SocketIOServer

function initSocket(server: HTTPServer) {
  io = new SocketIOServer(server, {
    cors: { origin: '*' }
  })

  io.on('connection', (socket) => {
    // Add your event listeners here
    socket.on('message', (data) => {
      io.emit('message', data)
    })
  })

  return io
}

export { initSocket, io }
