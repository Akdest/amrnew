export interface RobotStatusType {

  battery: number

  state: string

}

export interface DetectionType {

  label: string

  confidence: number

}

export interface AlertType {

  severity:
    | 'LOW'
    | 'MEDIUM'
    | 'HIGH'

  message: string

}