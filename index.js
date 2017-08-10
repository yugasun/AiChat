const express = require('express')
const app = express()

const SendChat = require('./tuling-ai')

// html
app.use(express.static(__dirname + '/views'))
// js, css, images
app.use(express.static(__dirname + '/public'))

const server = app.listen(5000)

const io = require('socket.io')(server)

// Web UI
app.get('/', (req, res) => {
  res.sendFile('index.html')
})

io.on('connection', (socket) => {
  console.log('a user connected')

  socket.on('chat message', (text) => {
    // get a replay from baidu ai
    SendChat(text)
      .then((res) => {
        console.log(res.results[0].values.text)
        socket.emit('bot reply', res.results[0].values.text)
      })
      .catch((err) => {
        console.log(err)
      })
  })
})
