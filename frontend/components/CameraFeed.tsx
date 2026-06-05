'use client'

import { useState } from 'react'

import {
  Camera,
  Wifi,
  WifiOff,
} from 'lucide-react'

import { useRobotStore }
  from '@/store/useRobotStore'

export default function CameraFeed() {

  const [isLive, setIsLive] =
    useState(false)

  const {
    setCameraOnline,
  } = useRobotStore()

  const handleConnected = () => {

    setIsLive(true)

    setCameraOnline(true)

  }

  const handleDisconnected = () => {

    setIsLive(false)

    setCameraOnline(false)

  }

  return (

    <div className="bg-white border border-gray-200 rounded-3xl p-4 sm:p-5 lg:p-6 shadow-sm h-full">

      {/* HEADER */}

      <div className="flex items-center justify-between mb-5">

        <div className="flex items-center gap-3">

          <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-2xl bg-blue-100 flex items-center justify-center">

            <Camera className="text-blue-600" />

          </div>

          <div>

            <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-black">
              Live Camera Feed
            </h2>

            <p className="text-xs sm:text-sm text-gray-500">
              Front Navigation Camera
            </p>

          </div>

        </div>

        {/* STATUS */}

        <div
          className={`flex items-center gap-2 px-3 py-2 rounded-xl border
            ${
              isLive
                ? 'bg-green-50 border-green-200 text-green-700'
                : 'bg-gray-50 border-gray-200 text-gray-500'
            }
          `}
        >

          {isLive ? (

            <Wifi
              size={16}
              className="text-green-600"
            />

          ) : (

            <WifiOff
              size={16}
              className="text-gray-500"
            />

          )}

          <span className="text-sm font-medium">

            {isLive
              ? 'LIVE'
              : 'OFFLINE'}

          </span>

        </div>

      </div>

      {/* STREAM */}

      <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-black aspect-video">

        <img
          src="http://192.168.0.103:8080/stream?topic=/image_raw&type=ros_compressed"
          alt="AMR Camera Stream"
          className="w-full h-full object-cover"

          onLoad={handleConnected}

          onError={handleDisconnected}
        />

        {!isLive && (

          <div className="absolute inset-0 flex items-center justify-center bg-black/40">

            <p className="text-white text-sm">

              Waiting for camera stream...

            </p>

          </div>

        )}

        {/* CAMERA LABEL */}

        <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm">

          <p className="text-sm text-white font-medium">

            AMR CAM 01

          </p>

        </div>

      </div>

    </div>

  )

}