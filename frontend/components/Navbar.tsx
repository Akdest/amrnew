'use client'

import { Bot } from 'lucide-react'
import { motion } from 'framer-motion'

import AlertsPanel from './AlertsPanel'
import { useRobotStore } from '@/store/useRobotStore'

export default function Navbar() {

  const {
    cameraOnline,
    lidarOnline,
    detectionOnline,
    ripenessOnline,
    speedOnline,
  } = useRobotStore()

  const activeFeeds =
    Number(cameraOnline) +
    Number(lidarOnline) +
    Number(detectionOnline) +
    Number(ripenessOnline) +
    Number(speedOnline)

  const totalFeeds = 5

  const isOnline =
    activeFeeds > 0

  return (

    <motion.header
      initial={{
        y: -30,
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/90 backdrop-blur-xl"
    >

      <div className="px-4 md:px-6 py-4 flex items-center justify-between">

        {/* LEFT */}
        <div className="flex items-center gap-3 min-w-0">

          <div className="h-11 w-11 shrink-0 rounded-2xl bg-green-100 flex items-center justify-center">

            <Bot className="text-green-600" />

          </div>

          <div className="min-w-0">

            <h1 className="text-lg md:text-2xl font-bold text-black truncate">

              AMR Dashboard

            </h1>

            <p className="hidden sm:block text-xs md:text-sm text-gray-500">

              Autonomous Mobile Robot Monitoring

            </p>

          </div>

        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-2 md:gap-4">

          {/* FEED COUNTER */}
          <div className="px-3 py-2 rounded-2xl border border-blue-200 bg-blue-50">

            <div className="flex items-center gap-2">

              <div className="h-2.5 w-2.5 rounded-full bg-blue-500" />

              <span className="text-xs md:text-sm font-semibold text-blue-700">

                {activeFeeds}/{totalFeeds}

              </span>

            </div>

          </div>

          {/* ROBOT STATUS */}
          <div
            className={`
              px-3 md:px-4 py-2 rounded-2xl border
              flex items-center gap-2
              ${
                isOnline
                  ? 'bg-green-50 border-green-200'
                  : 'bg-red-50 border-red-200'
              }
            `}
          >

            <div
              className={`
                h-2.5 w-2.5 rounded-full
                ${
                  isOnline
                    ? 'bg-green-500 animate-pulse'
                    : 'bg-red-500'
                }
              `}
            />

            <span
              className={`
                text-xs md:text-sm font-medium
                ${
                  isOnline
                    ? 'text-green-700'
                    : 'text-red-700'
                }
              `}
            >

              {isOnline
                ? 'Online'
                : 'Offline'}

            </span>

          </div>

          {/* FEED INDICATORS */}
          <div className="hidden lg:flex items-center gap-2">

            <FeedDot
              label="Cam"
              online={cameraOnline}
            />

            <FeedDot
              label="LiDAR"
              online={lidarOnline}
            />

            <FeedDot
              label="Detect"
              online={detectionOnline}
            />

            <FeedDot
              label="Ripeness"
              online={ripenessOnline}
            />

            <FeedDot
              label="Speed"
              online={speedOnline}
            />

          </div>

          <AlertsPanel />

        </div>

      </div>

    </motion.header>

  )

}

function FeedDot({
  label,
  online,
}: {
  label: string
  online: boolean
}) {

  return (

    <div
      className={`
        px-3 py-2 rounded-xl border
        flex items-center gap-2
        ${
          online
            ? 'bg-green-50 border-green-200'
            : 'bg-gray-50 border-gray-200'
        }
      `}
    >

      <div
        className={`
          h-2 w-2 rounded-full
          ${
            online
              ? 'bg-green-500'
              : 'bg-gray-400'
          }
        `}
      />

      <span
        className={`
          text-xs font-medium
          ${
            online
              ? 'text-green-700'
              : 'text-gray-500'
          }
        `}
      >

        {label}

      </span>

    </div>

  )

}