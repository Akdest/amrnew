'use client'

import {
  useEffect,
  useRef,
} from 'react'

import { socket } from '@/lib/socket'

import {
  useRobotStore,
} from '@/store/useRobotStore'

export const useSocket = () => {

  const {

    // ROBOT

    setBattery,
    setRobotStatus,

    // DETECTION

    setDetection,
    setDetectionConfidence,

    // RIPENESS

    setRipeness,

    // ALERTS

    addAlert,

    // LIDAR

    setLidarData,

    // SPEED

    setRobotSpeed,

    // ONLINE STATUS

    setBatteryOnline,
    setSpeedOnline,
    setLidarOnline,
    setDetectionOnline,
    setRipenessOnline,

  } = useRobotStore()

  // ==========================
  // LAST MESSAGE TIMESTAMPS
  // ==========================

  const lastBatteryMsg =
    useRef(Date.now())

  const lastSpeedMsg =
    useRef(Date.now())

  const lastLidarMsg =
    useRef(Date.now())

  const lastDetectionMsg =
    useRef(Date.now())

  const lastRipenessMsg =
    useRef(Date.now())

  useEffect(() => {

    socket.connect()

    // ==========================
    // CONNECT
    // ==========================

    socket.on(
      'connect',
      () => {

        console.log(
          'Socket Connected:',
          socket.id
        )

      }
    )

    // ==========================
    // DISCONNECT
    // ==========================

    socket.on(
      'disconnect',
      () => {

        console.log(
          'Socket Disconnected'
        )

        setBatteryOnline(
          false
        )

        setSpeedOnline(
          false
        )

        setLidarOnline(
          false
        )

        setDetectionOnline(
          false
        )

        setRipenessOnline(
          false
        )

      }
    )

    // ==========================
    // BATTERY + ROBOT STATUS
    // ==========================

    socket.on(
      'robot_status',
      (data) => {

        console.log(
          'BATTERY RECEIVED:',
          data
        )

        setBattery(
          Number(
            data.battery || 0
          )
        )

        setRobotStatus(
          data.state || 'ACTIVE'
        )

        setBatteryOnline(
          true
        )

        lastBatteryMsg.current =
          Date.now()

      }
    )

    // ==========================
    // DETECTION
    // ==========================

    socket.on(
      'detection',
      (data) => {

        setDetection(
          data.label
        )

        setDetectionConfidence(
          data.confidence
        )

        setDetectionOnline(
          true
        )

        lastDetectionMsg.current =
          Date.now()

      }
    )

    // ==========================
    // RIPENESS
    // ==========================

    socket.on(
      'ripeness',
      (data) => {

        setRipeness(
          data.value
        )

        setRipenessOnline(
          true
        )

        lastRipenessMsg.current =
          Date.now()

      }
    )

    // ==========================
    // ALERTS
    // ==========================

    socket.on(
      'alert',
      (data) => {

        addAlert(
          data.message
        )

      }
    )

    // ==========================
    // LIDAR
    // ==========================

    socket.on(
      'lidar_scan',
      (data) => {

        setLidarData(
          data
        )

        setLidarOnline(
          true
        )

        lastLidarMsg.current =
          Date.now()

      }
    )

    // ==========================
    // SPEED
    // ==========================

    socket.on(
      'robot_speed',
      (data) => {

        console.log(
          'CMD_VEL RECEIVED:',
          data
        )

        setRobotSpeed(
          data.linear_x || 0
        )

        setSpeedOnline(
          true
        )

        lastSpeedMsg.current =
          Date.now()

      }
    )

    // ==========================
    // WATCHDOG
    // ==========================

    const watchdog =
      setInterval(() => {

        const now =
          Date.now()

        if (
          now -
          lastBatteryMsg.current >
          3000
        ) {

          setBatteryOnline(
            false
          )

        }

        if (
          now -
          lastSpeedMsg.current >
          3000
        ) {

          setSpeedOnline(
            false
          )

        }

        if (
          now -
          lastLidarMsg.current >
          3000
        ) {

          setLidarOnline(
            false
          )

        }

        if (
          now -
          lastDetectionMsg.current >
          3000
        ) {

          setDetectionOnline(
            false
          )

        }

        if (
          now -
          lastRipenessMsg.current >
          3000
        ) {

          setRipenessOnline(
            false
          )

        }

      }, 1000)

    // ==========================
    // CLEANUP
    // ==========================

    return () => {

      clearInterval(
        watchdog
      )

      socket.off(
        'connect'
      )

      socket.off(
        'disconnect'
      )

      socket.off(
        'robot_status'
      )

      socket.off(
        'detection'
      )

      socket.off(
        'ripeness'
      )

      socket.off(
        'alert'
      )

      socket.off(
        'lidar_scan'
      )

      socket.off(
        'robot_speed'
      )

      socket.disconnect()

    }

  }, [])

}