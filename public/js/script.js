'use strict'

const socket = window.io()

const outputYou = document.querySelector('.output-you')
const outputBot = document.querySelector('.output-bot')

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
const recognition = new SpeechRecognition()

const button = document.querySelector('button')
const buttonIcon = button.querySelector('i')

recognition.lang = 'zh-CN'
recognition.interimResults = false
// recognition.maxAlternatives = 1

button.addEventListener('click', () => {
  buttonIcon.classList.remove('ion-ios-mic')
  buttonIcon.classList.add('ion-radio-waves')
  recognition.start()
})

recognition.addEventListener('speechstart', () => {
  console.log('Speech has been detected.')
})

recognition.addEventListener('result', (e) => {
  console.log('Result has been detected.')

  let last = e.results.length - 1
  let text = e.results[last][0].transcript

  outputYou.textContent = text
  console.log('Confidence: ' + e.results[0][0].confidence)
  socket.emit('chat message', text)
})

recognition.addEventListener('speechend', () => {
  buttonIcon.classList.remove('ion-radio-waves')
  buttonIcon.classList.add('ion-ios-mic')
  recognition.stop()
})

recognition.addEventListener('error', (e) => {
  buttonIcon.classList.remove('ion-radio-waves')
  buttonIcon.classList.add('ion-ios-mic')
  outputBot.textContent = 'Error: ' + e.error
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
