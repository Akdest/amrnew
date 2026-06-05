'use client'

import { useEffect } from 'react'
import * as ROSLIB from 'roslib'
import ros from '@/lib/ros'

export default function Lidar() {

  useEffect(() => {

    const scan = new ROSLIB.Topic({
      ros: ros,
      name: '/scan',
      messageType: 'sensor_msgs/LaserScan'
    })

    scan.subscribe((msg) => {
      console.log(msg)
    })

    return () => {
      scan.unsubscribe()
    }

  }, [])

  return (
    <div className="p-4 text-black">
      LiDAR Data
    </div>
  )
}