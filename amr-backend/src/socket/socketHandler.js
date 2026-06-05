const ROSLIB =
  require('roslib')

const {
  getRos,
} = require('../ros/rosConnection')

module.exports = (io) => {

  io.on('connection', (socket) => {

    const ros =
      getRos()

    console.log(
      'Frontend Connected'
    )

    if (!ros) {

      socket.emit(
        'ros_status',
        {
          online: false,
        }
      )

      return
    }

    const feeds = {

      camera: false,
      lidar: false,
      detection: false,
      ripeness: false,
      speed: false,

    }

    const feedTimeouts = {}

    const updateFeed = (name) => {

      feeds[name] = true

      socket.emit(
        'feed_status',
        feeds
      )

      if (
        feedTimeouts[name]
      ) {

        clearTimeout(
          feedTimeouts[name]
        )

      }

      feedTimeouts[name] =
        setTimeout(() => {

          feeds[name] = false

          socket.emit(
            'feed_status',
            feeds
          )

        }, 3000)

    }

    /*
    ==========================
    ROS STATUS
    ==========================
    */

    socket.emit(
      'ros_status',
      {
        online:
          ros.isConnected || false,
      }
    )

    const rosConnected =
      () => {

        socket.emit(
          'ros_status',
          {
            online: true,
          }
        )

      }

    const rosClosed =
      () => {

        socket.emit(
          'ros_status',
          {
            online: false,
          }
        )

      }

    ros.on(
      'connection',
      rosConnected
    )

    ros.on(
      'close',
      rosClosed
    )

    /*
    ==========================
    BATTERY
    ==========================
    */

    const batteryTopic =
      new ROSLIB.Topic({

        ros,

        name:
          '/battery',

        messageType:
          'sensor_msgs/BatteryState',

      })

   batteryTopic.subscribe((msg) => {



  socket.emit(
    'robot_status',
    {
      battery: msg.voltage,
      state: 'ACTIVE',
    }
  )

})

    /*
    ==========================
    DETECTION
    ==========================
    */

    const detectionTopic =
      new ROSLIB.Topic({

        ros,

        name:
          '/capsicum_detection',

        messageType:
          'std_msgs/String',

      })

    detectionTopic.subscribe(
      (msg) => {

        updateFeed(
          'detection'
        )

        socket.emit(
          'detection',
          {

            label:
              msg.data,

            confidence:
              100,

          }
        )

      }
    )

    /*
    ==========================
    RIPENESS
    ==========================
    */

    const ripenessTopic =
      new ROSLIB.Topic({

        ros,

        name:
          '/ripeness_result',

        messageType:
          'std_msgs/String',

      })

    ripenessTopic.subscribe(
      (msg) => {

        updateFeed(
          'ripeness'
        )

        socket.emit(
          'ripeness',
          {

            value:
              msg.data,

          }
        )

      }
    )

    /*
    ==========================
    ALERTS
    ==========================
    */

    const alertsTopic =
      new ROSLIB.Topic({

        ros,

        name:
          '/robot_alerts',

        messageType:
          'std_msgs/String',

      })

    alertsTopic.subscribe(
      (msg) => {

        socket.emit(
          'alert',
          {

            message:
              msg.data,

          }
        )

      }
    )

    /*
    ==========================
    LIDAR
    ==========================
    */

    const lidarTopic =
      new ROSLIB.Topic({

        ros,

        name:
          '/scan',

        messageType:
          'sensor_msgs/LaserScan',

      })

    lidarTopic.subscribe(
      (msg) => {

        updateFeed(
          'lidar'
        )

        socket.emit(
          'lidar_scan',
          {

            ranges:
              msg.ranges,

            angle_min:
              msg.angle_min,

            angle_increment:
              msg.angle_increment,

          }
        )

      }
    )

    /*
    ==========================
    CMD_VEL
    ==========================
    */

    const cmdVelTopic =
      new ROSLIB.Topic({

        ros,

        name:
          '/cmd_vel',

        messageType:
          'geometry_msgs/Twist',

      })

    cmdVelTopic.subscribe(
      (msg) => {

        updateFeed(
          'speed'
        )

        socket.emit(
          'robot_speed',
          {

            linear_x:
              msg.linear?.x || 0,

            angular_z:
              msg.angular?.z || 0,

          }
        )

      }
    )

    /*
    ==========================
    DISCONNECT
    ==========================
    */

    socket.on(
      'disconnect',
      () => {

        console.log(
          'Frontend Disconnected'
        )

        batteryTopic.unsubscribe()

        detectionTopic.unsubscribe()

        ripenessTopic.unsubscribe()

        alertsTopic.unsubscribe()

        lidarTopic.unsubscribe()

        cmdVelTopic.unsubscribe()

        ros.off(
          'connection',
          rosConnected
        )

        ros.off(
          'close',
          rosClosed
        )

        Object.values(
          feedTimeouts
        ).forEach(
          clearTimeout
        )

      }
    )

  })

}