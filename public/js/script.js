'use strict'

const socket = window.io()
const outputYou = document.querySelector('.output-you')
const outputBot = document.querySelector('.output-bot')

const button = document.querySelector('button')
const buttonIcon = button.querySelector('i')

const audio = document.querySelector('audio')
let recorder  // 录音器
let recording = false   // 是否正在录音
let recognizing = false   // 是否正在语音识别


setState('initialize')

button.addEventListener('click', () => {
  if (recognizing) {
    return
  }
  if (!recording) {
    buttonIcon.classList.remove('ion-ios-mic')
    buttonIcon.classList.add('ion-radio-waves')
    H5Recorder.init(function (rec) {
      recorder = rec
      recorder.start()
    })
    
    setState('recording')
  } else {

    let buffer = recorder.getBlob()

    socket.emit('chat message', buffer)
    setState('recognizing')
  
  }
})
 
/**
 * 设置当前状态
 * 
 * @param {any} status 
 */
function setState(status) {
  if( status === 'recording') {
    buttonIcon.classList = ['ion-radio-waves']
    outputYou.textContent = '录音中...'
    outputBot.textContent = ''
    recording = true
    recognizing = false
  } else if( status === 'recognizing') {
    buttonIcon.classList = ['ion-load-d']
    outputYou.textContent = '百度语音识别中...'
    outputBot.textContent = '百度语音识别中...'
    recording = false
    recognizing = true
  } else {
    buttonIcon.classList = ['ion-ios-mic']
    recording = false
    recognizing = false
  }
}

/**
 * 朗读文字
 * 
 * @param {any} text 
 */
function synthVoice(text) {
  const synth = window.speechSynthesis
  const utterance = new SpeechSynthesisUtterance()
  utterance.text = text
  synth.speak(utterance)
}

socket.on('bot reply', function (data) {
  console.log(data)
  let replay = data.replay
  synthVoice(replay)
  outputYou.textContent = data.say
  if (replay === '') replay = '(No answer...)'
  outputBot.textContent = replay
  setState('initialize')
})
