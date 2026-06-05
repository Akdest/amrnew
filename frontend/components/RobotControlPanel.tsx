'use client'

import {
  useRef,
} from 'react'

import * as ROSLIB from 'roslib'

import ros from '@/lib/ros'

import {
  Battery,
  Play,
  OctagonX,
  Wifi,
  WifiOff,
} from 'lucide-react'

import {
  useRobotStore,
} from '@/store/useRobotStore'

export default function RobotControlPanel() {

  const {

    battery,
    batteryOnline,

  } = useRobotStore()

  /*
  ==================================
  BATTERY CALCULATION
  ==================================
  */

  const voltage =
    Number(battery) || 0

  const percentage =
    Math.round(

      Math.max(
        0,

        Math.min(
          100,

          (
            (
              voltage - 12.0
            ) /

            (
              16.8 - 12.0
            )
          ) * 100
        )
      )

    )

  /*
  ==================================
  PUBLISHERS
  ==================================
  */

  const startMissionTopic =
    useRef(

      new ROSLIB.Topic({

        ros,

        name:
          '/start_mission',

        messageType:
          'std_msgs/String',

      })

    )

  const emergencyStopTopic =
    useRef(

      new ROSLIB.Topic({

        ros,

        name:
          '/emergency_stop',

        messageType:
          'std_msgs/String',

      })

    )

  /*
  ==================================
  BUTTON ACTIONS
  ==================================
  */

  const startMission =
    () => {

      startMissionTopic.current.publish({

        data: 'START',

      })

      console.log(
        'Mission Started'
      )

    }

  const emergencyStop =
    () => {

      emergencyStopTopic.current.publish({

        data: 'STOP',

      })

      console.log(
        'Emergency Stop Activated'
      )

    }

  /*
  ==================================
  UI COLORS
  ==================================
  */

  const batteryColor =

    percentage >= 70

      ? 'bg-green-500'

      : percentage >= 30

      ? 'bg-yellow-500'

      : 'bg-red-500'

  const batteryText =

    percentage >= 70

      ? 'Excellent'

      : percentage >= 30

      ? 'Moderate'

      : 'Low'

  return (

    <div className="bg-white border border-gray-200 shadow-sm rounded-3xl p-6 h-full">

      {/* HEADER */}

      <div className="flex items-center justify-between mb-6">

        <div>

          <h2 className="text-2xl font-semibold text-black">

            AMR Control

          </h2>

          <p className="text-sm text-gray-500">

            Mission & Battery Management

          </p>

        </div>

        <div className="flex items-center gap-3">

          {batteryOnline ? (

            <Wifi
              size={18}
              className="text-green-600"
            />

          ) : (

            <WifiOff
              size={18}
              className="text-red-600"
            />

          )}

          <Battery
            size={24}
            className={
              percentage >= 30
                ? 'text-green-600'
                : 'text-red-600'
            }
          />

          <span className="font-bold text-lg">

            {percentage}%

          </span>

        </div>

      </div>

      {/* BATTERY CARD */}

      <div className="bg-gray-50 border border-gray-200 rounded-3xl p-5 mb-8">

        <div className="flex justify-between items-center mb-3">

          <span className="text-gray-500">

            Battery Status

          </span>

          <span className="font-semibold text-black">

            {voltage.toFixed(2)} V

          </span>

        </div>

        <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">

          <div
            className={`${batteryColor} h-full transition-all duration-500`}
            style={{
              width: `${percentage}%`,
            }}
          />

        </div>

        <div className="flex justify-between mt-2 text-xs text-gray-500">

          <span>12.0V</span>

          <span>16.8V</span>

        </div>

      </div>

      {/* STATS */}

      <div className="grid grid-cols-2 gap-4 mb-8">

        <div className="bg-green-50 border border-green-200 rounded-2xl p-4 text-center">

          <p className="text-xs text-gray-500">

            Charge

          </p>

          <h3 className="text-3xl font-bold text-green-600">

            {percentage}%

          </h3>

        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 text-center">

          <p className="text-xs text-gray-500">

            Health

          </p>

          <h3 className="text-2xl font-bold text-blue-600">

            {batteryText}

          </h3>

        </div>

      </div>

      {/* BUTTONS */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        <button
          onClick={
            startMission
          }
          className="bg-green-500 hover:bg-green-600 active:scale-95 transition-all text-white px-6 py-5 rounded-2xl shadow-md flex items-center justify-center gap-3 font-semibold text-lg"
        >

          <Play size={24} />

          Start Mission

        </button>

        <button
          onClick={
            emergencyStop
          }
          className="bg-red-500 hover:bg-red-600 active:scale-95 transition-all text-white px-6 py-5 rounded-2xl shadow-md flex items-center justify-center gap-3 font-semibold text-lg"
        >

          <OctagonX
            size={24}
          />

          Emergency Stop

        </button>

      </div>

    </div>

  )

}