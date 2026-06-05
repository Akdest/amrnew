import { create } from 'zustand'

interface RobotStore {

  // ==========================
  // BATTERY
  // ==========================

  battery: number
  batteryOnline: boolean

  // ==========================
  // ROBOT
  // ==========================

  robotStatus: string

  // ==========================
  // DETECTION
  // ==========================

  detection: string
  detectionConfidence: number

  // ==========================
  // RIPENESS
  // ==========================

  ripeness: string

  // ==========================
  // ALERTS
  // ==========================

  alerts: string[]

  // ==========================
  // LIDAR
  // ==========================

  lidarData: any

  // ==========================
  // SPEED
  // ==========================

  robotSpeed: number

  // ==========================
  // FEED STATUS
  // ==========================

  cameraOnline: boolean
  lidarOnline: boolean
  detectionOnline: boolean
  ripenessOnline: boolean
  speedOnline: boolean

  // ==========================
  // SETTERS
  // ==========================

  setBattery: (value: number) => void

  setBatteryOnline: (
    value: boolean
  ) => void

  setRobotStatus: (
    value: string
  ) => void

  setDetection: (
    value: string
  ) => void

  setDetectionConfidence: (
    value: number
  ) => void

  setRipeness: (
    value: string
  ) => void

  addAlert: (
    value: string
  ) => void

  setLidarData: (
    value: any
  ) => void

  setRobotSpeed: (
    value: number
  ) => void

  setCameraOnline: (
    value: boolean
  ) => void

  setLidarOnline: (
    value: boolean
  ) => void

  setDetectionOnline: (
    value: boolean
  ) => void

  setRipenessOnline: (
    value: boolean
  ) => void

  setSpeedOnline: (
    value: boolean
  ) => void
}

export const useRobotStore =
  create<RobotStore>((set) => ({

    // ==========================
    // BATTERY
    // ==========================

    battery: 0,

    batteryOnline: false,

    // ==========================
    // ROBOT
    // ==========================

    robotStatus: 'Offline',

    // ==========================
    // DETECTION
    // ==========================

    detection: 'No Detection',

    detectionConfidence: 0,

    // ==========================
    // RIPENESS
    // ==========================

    ripeness: 'Unknown',

    // ==========================
    // ALERTS
    // ==========================

    alerts: [],

    // ==========================
    // LIDAR
    // ==========================

    lidarData: null,

    // ==========================
    // SPEED
    // ==========================

    robotSpeed: 0,

    // ==========================
    // FEED STATUS
    // ==========================

    cameraOnline: false,

    lidarOnline: false,

    detectionOnline: false,

    ripenessOnline: false,

    speedOnline: false,

    // ==========================
    // SETTERS
    // ==========================

    setBattery: (value) =>
      set({
        battery: value,
      }),

    setBatteryOnline: (value) =>
      set({
        batteryOnline: value,
      }),

    setRobotStatus: (value) =>
      set({
        robotStatus: value,
      }),

    setDetection: (value) =>
      set({
        detection: value,
      }),

    setDetectionConfidence: (value) =>
      set({
        detectionConfidence: value,
      }),

    setRipeness: (value) =>
      set({
        ripeness: value,
      }),

    addAlert: (value) =>
      set((state) => ({
        alerts: [
          value,
          ...state.alerts,
        ],
      })),

    setLidarData: (value) =>
      set({
        lidarData: value,
      }),

    setRobotSpeed: (value) =>
      set({
        robotSpeed: value,
      }),

    setCameraOnline: (value) =>
      set({
        cameraOnline: value,
      }),

    setLidarOnline: (value) =>
      set({
        lidarOnline: value,
      }),

    setDetectionOnline: (value) =>
      set({
        detectionOnline: value,
      }),

    setRipenessOnline: (value) =>
      set({
        ripenessOnline: value,
      }),

    setSpeedOnline: (value) =>
      set({
        speedOnline: value,
      }),

  }))