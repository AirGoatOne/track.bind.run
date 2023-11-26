export interface TrackPoint {
  time: string
  lat: number
  lon: number
  ele: number
}

export interface GpxState {
  trackpoints: TrackPoint[]
  name: string
}

export interface ControlsState {
  current: number
  play: boolean
  autoCenter: boolean
  timing: number
  currentTrackpoint?: TrackPoint
}
