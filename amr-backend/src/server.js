require('dotenv').config()

const http = require('http')

const app = require('./app')

const { Server } = require('socket.io')

const socketHandler =
  require('./socket/socketHandler')

const server =
  http.createServer(app)

const io = new Server(server, {

  cors: {
    origin: '*',
  },

})

socketHandler(io)

const PORT =
  process.env.PORT || 5000

server.listen(PORT, () => {

  console.log(
    `Server running on port ${PORT}`
  )

})