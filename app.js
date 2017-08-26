require('dotenv').config()

const path = require('path')
const Koa = require('koa')
const KoaRouter = require('koa-router')
const KoaStatic = require('koa-static')
const IO = require('koa-socket')
const SendChat = require('./tuling-ai') // 图灵机器人回复
const AipSpeech = require('./baidu-ai').speech  // 百度语音识别

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
  // 识别本地文件，附带参数
  client.recognize(voiceBuffer, 'wav', 16000, { lan: 'zh' })
    .then(function (res) {
      if (res.err_no === 0) {
        let text = res.result[0]
        SendChat(text)
          .then((res) => {
            io.broadcast('bot reply', { say: text, replay: res.results[0].values.text })
          })
          .catch((err) => {
            console.error(err)
          })
      } else {
        console.error(err)
      }

    })
    .catch(function (err) {
      console.error(err)
    })

})

app.listen(5000)

console.log('Server is on: http://localhost:5000')
