const ROSLIB = require('roslib')

let ros = null

const ROSBRIDGE_URL =
  'ws://192.168.0.109:9090'

function connectROS() {

  console.log(
    'Attempting ROSBridge connection...'
  )

  ros = new ROSLIB.Ros({
    url: ROSBRIDGE_URL,
  })

  ros.on('connection', () => {

    console.log(
      '✅ Connected to ROSBridge'
    )

  })

  ros.on('error', (error) => {

    console.log(
      '❌ ROSBridge Error:',
      error.message || error
    )

  })

  ros.on('close', () => {

    console.log(
      '⚠️ ROSBridge Connection Closed'
    )

    console.log(
      '🔄 Reconnecting in 3 seconds...'
    )

    setTimeout(() => {

      connectROS()

    }, 3000)

  })

}

connectROS()

module.exports = {

  getRos: () => ros,

}