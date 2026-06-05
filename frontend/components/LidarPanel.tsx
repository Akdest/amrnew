'use client'

import {
  useEffect,
  useRef,
  useState,
} from 'react'

import {
  Radar,
  Wifi,
  WifiOff,
} from 'lucide-react'

import {
  useRobotStore,
} from '@/store/useRobotStore'

export default function LidarPanel() {

  const canvasRef =
    useRef<HTMLCanvasElement | null>(null)

  const [nearest, setNearest] =
    useState<number | null>(null)

  const [objects, setObjects] =
    useState(0)

  const {
    lidarData,
    setLidarOnline,
  } = useRobotStore()

  useEffect(() => {

    if (!lidarData) {

      setLidarOnline(false)

      return

    }

    setLidarOnline(true)

    const canvas =
      canvasRef.current

    if (!canvas) return

    const ctx =
      canvas.getContext('2d')

    if (!ctx) return

    const width =
      canvas.width

    const height =
      canvas.height

    const centerX =
      width / 2

    const centerY =
      height / 2

    const maxRadius = 210

    const maxRange = 5

    ctx.clearRect(
      0,
      0,
      width,
      height
    )

    // ====================
    // BACKGROUND
    // ====================

    ctx.fillStyle =
      '#ffffff'

    ctx.fillRect(
      0,
      0,
      width,
      height
    )

    // ====================
    // SAFETY ZONES
    // ====================

    const zones = [

      {
        radius: 70,
        color: '#fee2e2',
      },

      {
        radius: 140,
        color: '#fef3c7',
      },

      {
        radius: 210,
        color: '#dcfce7',
      },

    ]

    zones.reverse().forEach(
      (zone) => {

        ctx.beginPath()

        ctx.fillStyle =
          zone.color

        ctx.arc(
          centerX,
          centerY,
          zone.radius,
          0,
          Math.PI * 2
        )

        ctx.fill()

      }
    )

    // ====================
    // GRID
    // ====================

    for (
      let r = 70;
      r <= 210;
      r += 70
    ) {

      ctx.beginPath()

      ctx.strokeStyle =
        '#d1d5db'

      ctx.lineWidth = 1

      ctx.arc(
        centerX,
        centerY,
        r,
        0,
        Math.PI * 2
      )

      ctx.stroke()

    }

    // ====================
    // CROSSHAIR
    // ====================

    ctx.strokeStyle =
      '#9ca3af'

    ctx.beginPath()

    ctx.moveTo(
      centerX,
      0
    )

    ctx.lineTo(
      centerX,
      height
    )

    ctx.stroke()

    ctx.beginPath()

    ctx.moveTo(
      0,
      centerY
    )

    ctx.lineTo(
      width,
      centerY
    )

    ctx.stroke()

    // ====================
    // FRONT ARROW
    // ====================

    ctx.fillStyle =
      '#2563eb'

    ctx.beginPath()

    ctx.moveTo(
      centerX,
      centerY - 30
    )

    ctx.lineTo(
      centerX - 10,
      centerY - 10
    )

    ctx.lineTo(
      centerX + 10,
      centerY - 10
    )

    ctx.closePath()

    ctx.fill()

    // ====================
    // ROBOT
    // ====================

    ctx.beginPath()

    ctx.fillStyle =
      '#1d4ed8'

    ctx.arc(
      centerX,
      centerY,
      16,
      0,
      Math.PI * 2
    )

    ctx.fill()

    // ====================
    // POINTS
    // ====================

    const {
      ranges,
      angle_min,
      angle_increment,
    } = lidarData

    let minDistance =
      Infinity

    let obstacleCount = 0

    ranges.forEach(
      (
        range: number,
        index: number
      ) => {

        if (
          !range ||
          range === Infinity ||
          range > maxRange
        ) {
          return
        }

        obstacleCount++

        minDistance =
          Math.min(
            minDistance,
            range
          )

        const angle =
          angle_min +
          (
            index *
            angle_increment
          )

        const scaled =
          (
            range /
            maxRange
          ) *
          maxRadius

        const x =
          centerX +
          Math.cos(angle)
          * scaled

        const y =
          centerY +
          Math.sin(angle)
          * scaled

        let color =
          '#16a34a'

        if (range < 1) {

          color =
            '#dc2626'

        }

        else if (
          range < 2
        ) {

          color =
            '#d97706'

        }

        ctx.beginPath()

        ctx.fillStyle =
          color

        ctx.arc(
          x,
          y,
          3,
          0,
          Math.PI * 2
        )

        ctx.fill()

      }
    )

    setObjects(
      obstacleCount
    )

    setNearest(
      minDistance === Infinity
        ? null
        : minDistance
    )

  }, [
    lidarData,
    setLidarOnline,
  ])

  const isOnline =
    !!lidarData

  return (

    <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">

      {/* HEADER */}

      <div className="flex items-center justify-between mb-5">

        <div className="flex items-center gap-3">

          <div className="h-12 w-12 rounded-2xl bg-green-100 flex items-center justify-center">

            <Radar className="text-green-600" />

          </div>

          <div>

            <h2 className="text-2xl font-semibold">
              LiDAR Scanner
            </h2>

            <p className="text-sm text-gray-500">
              Live Obstacle Monitoring
            </p>

          </div>

        </div>

        <div
          className={`flex items-center gap-2 px-3 py-2 rounded-xl border ${
            isOnline
              ? 'bg-green-50 border-green-200'
              : 'bg-gray-50 border-gray-200'
          }`}
        >

          {isOnline ? (
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

            {isOnline
              ? 'LIVE'
              : 'OFFLINE'}

          </span>

        </div>

      </div>

      {/* STATS */}

      <div className="grid grid-cols-2 gap-4 mb-5">

        <div className="bg-gray-50 border rounded-2xl p-4">

          <p className="text-sm text-gray-500">
            Nearest Obstacle
          </p>

          <h3 className="text-2xl font-bold">

            {nearest
              ? `${nearest.toFixed(2)}m`
              : '--'}

          </h3>

        </div>

        <div className="bg-gray-50 border rounded-2xl p-4">

          <p className="text-sm text-gray-500">
            Objects
          </p>

          <h3 className="text-2xl font-bold">

            {objects}

          </h3>

        </div>

      </div>

      {/* RADAR */}

      <div className="rounded-2xl border border-gray-200 overflow-hidden flex justify-center">

        <canvas
          ref={canvasRef}
          width={500}
          height={500}
          className="w-full max-w-[500px]"
        />

      </div>

    </div>

  )

}