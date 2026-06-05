'use client'

import { useRobotStore } from '@/store/useRobotStore'

import {
  Gauge,
  Activity,
  Wifi,
  WifiOff,
} from 'lucide-react'

export default function RobotStatus() {

  const {
    robotSpeed,
    speedOnline,
  } = useRobotStore()

  return (

    <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm h-full">

      {/* HEADER */}

      <div className="flex items-center gap-4 mb-8">

        <div className="h-14 w-14 rounded-2xl bg-blue-100 flex items-center justify-center">

          <Gauge
            size={28}
            className="text-blue-600"
          />

        </div>

        <div>

          <h2 className="text-2xl font-bold text-black">

            Robot Status

          </h2>

          <p className="text-gray-500">

            Live Motion Telemetry

          </p>

        </div>

      </div>

      {/* MAIN CARD */}

      <div className="rounded-3xl border border-gray-200 bg-gray-50 p-8 flex flex-col items-center justify-center min-h-[500px]">

        {/* ICON */}

        <div
          className={`h-24 w-24 rounded-full flex items-center justify-center mb-8
          ${
            speedOnline
              ? 'bg-green-100'
              : 'bg-red-100'
          }`}
        >

          <Activity
            size={48}
            className={
              speedOnline
                ? 'text-green-600'
                : 'text-red-600'
            }
          />

        </div>

        {/* LABEL */}

        <p className="text-xl text-gray-500 mb-3">

          Linear Velocity (X)

        </p>

        {/* SPEED */}

        <h1 className="text-7xl font-bold text-black leading-none">

          {robotSpeed.toFixed(2)}

        </h1>

        <p className="text-3xl text-gray-500 mt-4">

          m/s

        </p>

        {/* STATUS */}

        <div
          className={`mt-10 flex items-center gap-3 px-6 py-3 rounded-full font-medium
          ${
            speedOnline
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-700'
          }`}
        >

          {speedOnline ? (

            <Wifi size={20} />

          ) : (

            <WifiOff size={20} />

          )}

          <span>

            {speedOnline
              ? 'CMD_VEL Publisher Active'
              : 'CMD_VEL Publisher Offline'}

          </span>

        </div>

        {/* EXTRA STATS */}

        <div className="grid grid-cols-2 gap-4 mt-10 w-full max-w-xl">

          <div className="bg-white border border-gray-200 rounded-3xl p-5 text-center">

            <p className="text-gray-500 text-sm">

              Feed Status

            </p>

            <p
              className={`text-2xl font-bold mt-2
              ${
                speedOnline
                  ? 'text-green-600'
                  : 'text-red-600'
              }`}
            >

              {speedOnline
                ? 'Active'
                : 'Inactive'}

            </p>

          </div>

          <div className="bg-white border border-gray-200 rounded-3xl p-5 text-center">

            <p className="text-gray-500 text-sm">

              Current Speed

            </p>

            <p className="text-2xl font-bold mt-2 text-blue-600">

              {robotSpeed.toFixed(2)} m/s

            </p>

          </div>

        </div>

      </div>

    </div>

  )

}