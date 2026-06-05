'use client'

import Navbar from '@/components/Navbar'

import CameraFeed
  from '@/components/CameraFeed'

import LidarPanel
  from '@/components/LidarPanel'

import DetectionPanel
  from '@/components/DetectionPanel'

import RipenessPanel
  from '@/components/RipenessPanel'

import RobotStatus
  from '@/components/RobotStatus'

import RobotControlPanel
  from '@/components/RobotControlPanel'

import { useSocket }
  from '@/hooks/useSocket'

export default function HomePage() {

  useSocket()

  return (

    <main className="min-h-screen bg-gray-50 text-black">

      <Navbar />

      <div className="max-w-[1800px] mx-auto p-4 md:p-6">

        {/* TOP DASHBOARD */}
        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-5
          "
        >

          {/* CAMERA */}
          <div className="h-full">

            <CameraFeed />

          </div>

          {/* LIDAR */}
          <div className="h-full">

            <LidarPanel />

          </div>

          {/* DETECTION */}
          <div className="h-full">

            <DetectionPanel />

          </div>

          {/* RIPENESS */}
          <div className="h-full">

            <RipenessPanel />

          </div>

        </div>

        {/* BOTTOM PANELS */}
        <div
          className="
            mt-5
            grid
            grid-cols-1
            xl:grid-cols-2
            gap-5
          "
        >

          <RobotStatus />

          <RobotControlPanel />

        </div>

      </div>

    </main>

  )

}