'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

import {
  Bell,
  X,
  TriangleAlert,
  ShieldCheck,
} from 'lucide-react'

import { useRobotStore }
  from '@/store/useRobotStore'

type AlertItem = {

  id: number

  message: string

  severity:
    | 'LOW'
    | 'MEDIUM'
    | 'HIGH'

  timestamp: string

}

export default function AlertsPanel() {

  const [open, setOpen] =
    useState(false)

  const [mounted, setMounted] =
    useState(false)

  const [alertsData, setAlertsData] =
    useState<AlertItem[]>([])

  const { alerts } =
    useRobotStore()

  useEffect(() => {

    setMounted(true)

  }, [])

  // STORE → ALERT UI
  useEffect(() => {

    if (!alerts.length) return

    const latestAlert =
      alerts[0]

    const severity =
      latestAlert
        .toLowerCase()
        .includes('obstacle')
        ? 'HIGH'
        : latestAlert
            .toLowerCase()
            .includes('battery')
        ? 'MEDIUM'
        : 'LOW'

    const newAlert: AlertItem = {

      id: Date.now(),

      message: latestAlert,

      severity,

      timestamp:
        new Date()
          .toLocaleTimeString(),

    }

    setAlertsData((prev) => {

      // PREVENT DUPLICATES
      const alreadyExists =
        prev.some(
          (item) =>
            item.message ===
            newAlert.message
        )

      if (alreadyExists)
        return prev

      return [
        newAlert,
        ...prev.slice(0, 24),
      ]

    })

  }, [alerts])

  const hasAlerts =
    alertsData.length > 0

  const highAlerts =
    alertsData.filter(
      (alert) =>
        alert.severity === 'HIGH'
    )

  // BUTTON COLOR
  const buttonStyle =
    highAlerts.length > 0
      ? 'border-red-300 bg-red-50 text-red-600'
      : hasAlerts
      ? 'border-yellow-300 bg-yellow-50 text-yellow-700'
      : 'border-gray-200 bg-white text-black'

  // ALERT CARD STYLES
  const getAlertStyles = (
    severity: string
  ) => {

    switch (severity) {

      case 'HIGH':

        return {

          card:
            'bg-red-50 border-red-200',

          text:
            'text-red-700',

          badge:
            'bg-red-100 text-red-700',

        }

      case 'MEDIUM':

        return {

          card:
            'bg-yellow-50 border-yellow-200',

          text:
            'text-yellow-700',

          badge:
            'bg-yellow-100 text-yellow-700',

        }

      default:

        return {

          card:
            'bg-blue-50 border-blue-200',

          text:
            'text-blue-700',

          badge:
            'bg-blue-100 text-blue-700',

        }

    }

  }

  return (

    <>

      {/* ALERT BUTTON */}
      <button
        onClick={() => setOpen(true)}
        className={`flex items-center gap-2 px-4 py-2 rounded-2xl border transition-all duration-300 ${buttonStyle}`}
      >

        <Bell size={18} />

        {/* SMALL */}
        <span className="block md:hidden font-medium">

          {alertsData.length}

        </span>

        {/* LARGE */}
        <span className="hidden md:block font-medium">

          Alerts

        </span>

      </button>

      {/* MODAL */}
      {mounted &&
        open &&
        createPortal(

          <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/20 backdrop-blur-sm p-4">

            {/* DIALOG */}
            <div className="relative w-full max-w-3xl bg-white border border-gray-200 rounded-3xl shadow-2xl overflow-hidden">

              {/* HEADER */}
              <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">

                <div>

                  <h2 className="text-2xl font-semibold text-black">

                    System Alerts

                  </h2>

                  <p className="text-sm text-gray-500 mt-1">

                    Real-time AMR safety monitoring

                  </p>

                </div>

                {/* CLOSE */}
                <button
                  onClick={() => setOpen(false)}
                  className="h-11 w-11 rounded-2xl border border-gray-200 bg-white hover:bg-gray-100 transition-all flex items-center justify-center"
                >

                  <X
                    size={20}
                    className="text-gray-700"
                  />

                </button>

              </div>

              {/* BODY */}
              <div className="max-h-[70vh] overflow-y-auto p-6 space-y-4">

                {!hasAlerts ? (

                  <div className="flex flex-col items-center justify-center py-20 text-center">

                    <ShieldCheck
                      size={52}
                      className="text-green-500 mb-4"
                    />

                    <h3 className="text-2xl font-semibold text-black mb-2">

                      System Stable

                    </h3>

                    <p className="text-gray-500">

                      No active alerts detected.

                    </p>

                  </div>

                ) : (

                  alertsData.map(
                    (alert) => {

                      const styles =
                        getAlertStyles(
                          alert.severity
                        )

                      return (

                        <div
                          key={alert.id}
                          className={`border rounded-2xl p-5 ${styles.card}`}
                        >

                          <div className="flex items-start gap-4">

                            <div className="mt-1">

                              <TriangleAlert
                                size={22}
                                className={styles.text}
                              />

                            </div>

                            <div className="flex-1">

                              {/* TOP */}
                              <div className="flex items-center justify-between gap-4 mb-3 flex-wrap">

                                <div className="flex items-center gap-3">

                                  <span
                                    className={`text-xs font-semibold px-3 py-1 rounded-full ${styles.badge}`}
                                  >

                                    {alert.severity}

                                  </span>

                                  <span className="text-sm text-gray-500">

                                    {alert.timestamp}

                                  </span>

                                </div>

                              </div>

                              {/* MESSAGE */}
                              <p
                                className={`font-medium ${styles.text}`}
                              >

                                {alert.message}

                              </p>

                            </div>

                          </div>

                        </div>

                      )

                    }
                  )

                )}

              </div>

            </div>

          </div>,

          document.body

        )}

    </>

  )
}