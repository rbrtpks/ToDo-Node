const app = require('express')()
const consign = require('consign')
const db = require('./config/db')

const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer, {
  cors: {
    origin: '*'
  }
});

app.db = db

io.on('connection', (socket) => {
  console.log(`New connection: ${socket.id}`)

  socket.on('new_todo', async (message) => {
    const todo_updated = await app.db('todo_list')
      .select()

    let result = {
      'pending': [],
      'completed': [],
    }

    todo_updated.forEach(element => {
      element.status == 'pending' ? result.pending.push(element) : result.completed.push(element)
    });

    io.emit('broadcast', result);
  })
})

consign()
  .then('./config/middlewares.js')
  .then('./api/validation.js')
  .then('./api')
  .then('./config/routes.js')
  .into(app)

httpServer.listen(3000, () => {
  console.log('Backend executing...')
})