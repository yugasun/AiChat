require('dotenv').config()

const path = require('path')
const fs = require('fs')
const Koa = require('koa')
const KoaRouter = require('koa-router')
const KoaStatic = require('koa-static')
const IO = require('koa-socket')
const SendChat = require('./tuling-ai')
const AipSpeech = require('./baidu-ai').speech
const lamejs = require('lamejs')

const app = new Koa()
const router = new KoaRouter()
const io = new IO()

// 设置APPID/AK/SK
// APP_ID = '你的 App ID'
// API_KEY = '你的 Api ID'
// SECRET_KEY = '你的 Secret Key'
const client = new AipSpeech(process.env.APP_ID, process.env.API_KEY, process.env.SECRET_KEY)

router.get('/', async (ctx, next) => {
  ctx.render('index.html')
})

router.post('/upload', async (ctx, next) => {

})

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
  const voiceBuffer = socket.data
  const buffer16K = encodeBuffer(voiceBuffer)
  console.log(buffer16K)
  // 识别本地文件，附带参数
  client.recognize(buffer16K, 'wav', 16000, { lan: 'zh' })
    .then(function (result) {
      console.log('<recognize>: ' + JSON.stringify(result))
    })
    .catch(function (err) {
      console.log(err)
    })

  // SendChat(text)
  //   .then((res) => {
  //     console.log(res.results[0].values.text)
  //     io.broadcast('bot reply', res.results[0].values.text)
  //   })
  //   .catch((err) => {
  //     console.log(err)
  //   })
})

function encodeBuffer (buffer) {
  let mp3Data = []
  let newBuffer = []
  const mp3encoder = new lamejs.Mp3Encoder(1, 16000, 128)
  let mp3Tmp = mp3encoder.encodeBuffer(buffer)
  // Push encode buffer to mp3Data variable
  mp3Data.push(mp3Tmp)

  // Get end part of mp3
  mp3Tmp = mp3encoder.flush()

  // Write last data to the output data, too
  // mp3Data contains now the complete mp3Data
  mp3Data.push(mp3Tmp)

  newBuffer.push(new Int8Array(mp3Data))

  return newBuffer
}

app.listen(5000)
