'use client'

import {
  Leaf,
  Circle,
} from 'lucide-react'

import {
  useRobotStore,
} from '@/store/useRobotStore'

export default function RipenessPanel() {

  const {
    ripeness,
  } = useRobotStore()

  /*
    SUPPORTED ROS FORMATS

    Matured:14;Semi-Matured:8;Unmatured:5

    OR

    Matured:14,
    Semi-Matured:8,
    Unmatured:5

    OR

    Matured:14
    Semi-Matured:8
    Unmatured:5
  */

  const ripenessLines =
    ripeness
      ? ripeness
          .split(/[\n;,]+/)
          .map(item => item.trim())
          .filter(Boolean)
      : []

  const getColor = (
    label: string
  ) => {

    const text =
      label.toLowerCase()

    if (
      text.includes('matured') &&
      !text.includes('semi')
    ) {

      return {
        bg: 'bg-green-50',
        border: 'border-green-200',
        text: 'text-green-600',
      }

    }

    if (
      text.includes('semi')
    ) {

      return {
        bg: 'bg-yellow-50',
        border: 'border-yellow-200',
        text: 'text-yellow-600',
      }

    }

    if (
      text.includes('unmatured')
    ) {

      return {
        bg: 'bg-red-50',
        border: 'border-red-200',
        text: 'text-red-600',
      }

    }

    return {
      bg: 'bg-gray-50',
      border: 'border-gray-200',
      text: 'text-gray-600',
    }

  }

  const totalCount =
    ripenessLines.reduce(
      (
        sum,
        item
      ) => {

        const value =
          parseInt(
            item.split(':')[1]
          ) || 0

        return sum + value

      },
      0
    )

  return (

    <div className="bg-white border border-gray-200 rounded-3xl p-6 h-[400px] shadow-sm flex flex-col">

      {/* HEADER */}

      <div className="flex items-center justify-between mb-5">

        <div className="flex items-center gap-3">

          <div className="h-12 w-12 rounded-2xl bg-yellow-100 flex items-center justify-center">

            <Leaf className="text-yellow-600" />

          </div>

          <div>

            <h2 className="text-2xl font-semibold text-black">
              Ripeness Detector
            </h2>

            <p className="text-sm text-gray-500">
              Fruit Maturity Analysis
            </p>

          </div>

        </div>

        <div className="text-right">

          <p className="text-xs text-gray-500">
            Total
          </p>

          <h3 className="text-3xl font-bold text-black">
            {totalCount}
          </h3>

        </div>

      </div>

      {/* DATA */}

      <div className="flex-1 overflow-y-auto space-y-3 pr-1">

        {ripenessLines.length === 0 ? (

          <div className="h-full flex items-center justify-center">

            <p className="text-gray-500">
              Waiting for ripeness data...
            </p>

          </div>

        ) : (

          ripenessLines.map(
            (
              item,
              index
            ) => {

              const parts =
                item.split(':')

              const label =
                parts[0]?.trim() ||
                'Unknown'

              const count =
                parts[1]?.trim() ||
                '0'

              const color =
                getColor(label)

              return (

                <div
                  key={index}
                  className={`border rounded-2xl p-4 ${color.bg} ${color.border}`}
                >

                  <div className="flex items-center justify-between">

                    <div className="flex items-center gap-3">

                      <Circle
                        size={14}
                        className={color.text}
                        fill="currentColor"
                      />

                      <div>

                        <p className="font-semibold text-black capitalize">
                          {label}
                        </p>

                        <p className="text-xs text-gray-500">
                          Ripeness Category
                        </p>

                      </div>

                    </div>

                    <div className="text-right">

                      <h3
                        className={`text-3xl font-bold ${color.text}`}
                      >
                        {count}
                      </h3>

                    </div>

                  </div>

                </div>

              )

            }
          )

        )}

      </div>

    </div>

  )

}