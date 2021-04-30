const app = require('express')()
const consign = require('consign')
const db = require('./config/db')

app.db = db

consign()
  .then('./config/middlewares.js')
  .then('./api/validation.js')
  .then('./api')
  .then('./config/routes.js')
  .into(app)


  // TESTING WEB SOCKET
// var ws = require('express-ws')(app);
// app.ws('/', async (s, req) => {
//   console.error('websocket connection');
//   console.log(req.headers['sec-websocket-key'])

//   const todo = await app.db('todo_list')
//     .select()

//   s.send('Test', () => { })
// });

app.listen(3000, () => {
  console.log('Backend executando...')
})