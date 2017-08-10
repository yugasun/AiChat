
const request = require('request-promise')

function SendChat (text) {
  const textTpl = {
    'perception': {
      'inputText': {
        'text': text
      },
      'selfInfo': {
        'from': 'chat'
      }
    },
    'userInfo': {
      'apiKey': '273600c2cb9a4a09abf4b55f76826cb7',
      'userId': 'test'
    }
  }

  let options = {
    method: 'POST',
    uri: 'http://openapi.tuling123.com/openapi/api/v2',
    body: textTpl,
    json: true
  }

  return request(options)
}

module.exports = SendChat
