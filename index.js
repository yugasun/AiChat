const path = require('path')
const http = require('http')
const https = require('https')
const fs = require('fs')

const Koa = require('koa')
const KoaRouter = require('koa-router')
const KoaStatic = require('koa-static')
const KoaSslify = require('koa-sslify')
const IO = require('koa-socket')
const SendChat = require('./tuling-ai')

const app = new Koa()
const router = new KoaRouter()
const io = new IO()

router.get('/', async (req, res) => {
  res.sendFile('index.html')
})

// Force HTTPS on all page
app.use(KoaSslify({
  trustProtoHeader: true
}))

// html
app.use(KoaStatic(path.join(__dirname, 'views')))
// js, css, images
app.use(KoaStatic(path.join(__dirname, 'public')))

app.use(router.routes())
app.use(router.allowedMethods())

io.attach(app)

io.on('connection', (socket) => {
  console.log('a user connected')
})

io.on('chat message', (socket) => {
  const text = socket.data

  SendChat(text)
    .then((res) => {
      console.log(res.results[0].values.text)
      io.broadcast('bot reply', res.results[0].values.text)
    })
    .catch((err) => {
      console.log(err)
    })
})

app.listen(5000)
