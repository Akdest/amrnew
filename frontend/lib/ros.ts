import * as ROSLIB from 'roslib'

const ros = new ROSLIB.Ros({
  url: 'ws://localhost:9090',
})

ros.on('connection', () => {
  console.log('Connected to ROSBridge')
})

ros.on('error', (error) => {
  console.log('ROS Error:', error)
})

ros.on('close', () => {
  console.log('ROS Connection Closed')
})

export default ros