'use strict'

let recording = false
const socket = window.io()
const outputYou = document.querySelector('.output-you')
const outputBot = document.querySelector('.output-bot')

const button = document.querySelector('button')
const buttonIcon = button.querySelector('i')

const constraints = {
  audio: true,
  video: false
}

const audio = document.querySelector('audio')

let chunks = []

navigator.mediaDevices.getUserMedia(constraints)
.then(function (stream) {
  console.log('mediaDevices.getUserMedia() got stream: ' + stream)
  window.stream = stream
  const mediaRecorder = new MediaRecorder(stream)
  button.addEventListener('click', () => {
    if (!recording) {
      buttonIcon.classList.remove('ion-ios-mic')
      buttonIcon.classList.add('ion-radio-waves')
      mediaRecorder.start()

      recording = true
    } else {
      buttonIcon.classList.remove('ion-radio-waves')
      buttonIcon.classList.add('ion-ios-mic')
      console.log('rate', mediaRecorder)
      mediaRecorder.stop()
      recording = false
    }
  })

  mediaRecorder.onstop = function () {
    console.log('data available after MediaRecorder.stop() called.')
    var voiceBuffer = new Blob(chunks, { type: 'audio/wav' })
    chunks = []
    var audioURL = window.URL.createObjectURL(voiceBuffer)
    audio.setAttribute('src', audioURL)
    socket.emit('chat message', voiceBuffer)
    console.log('recorder stopped')
  }

  mediaRecorder.ondataavailable = function (e) {
    chunks.push(e.data)
  }
})
.catch(function (err) {
  console.log('navigator.mediaDevices.getUserMedia error: ', err)
})

function synthVoice (text) {
  const synth = window.speechSynthesis
  const utterance = new SpeechSynthesisUtterance()
  utterance.text = text
  synth.speak(utterance)
}

socket.on('bot reply', function (replyText) {
  synthVoice(replyText)

  if (replyText === '') replyText = '(No answer...)'
  outputBot.textContent = replyText
})
