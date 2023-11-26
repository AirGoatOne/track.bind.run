import "./App.css"
import { useAppDispatch, useAppSelector } from "./app/hooks"
import { selectTrackpoints } from "./features/gpx-upload/gpxSlice"
import {
  MapContainer,
  Marker,
  TileLayer,
  useMap,
  Polyline,
} from "react-leaflet"
import { LatLngTuple, divIcon } from "leaflet"
import Cockpit from "./components/Cockpit"
import { useEffect, useRef, useState } from "react"
import { TrackPoint } from "./types/types"
import {
  nextPosition,
  selectAutoCenter,
  selectCurrent,
  selectPlay,
  selectTiming,
  setCurrentTrackpoint,
} from "./features/controls/controlsSlice"

type RecenterMapProps = {
  position: LatLngTuple
}
const RecenterMap: React.FC<RecenterMapProps> = ({ position }) => {
  const map = useMap()
  const [lat, lng] = position
  useEffect(() => {
    map.setView([lat, lng])
  }, [lat, lng])
  return null
}

function polylinePointsFromTrackPoint(
  point: TrackPoint,
): [number, number, number] {
  return [point.lat, point.lon, point.ele]
}

const customMarker = divIcon({
  html: '<div class="custom-marker"></div>',
})

function App() {
  const trackpoints = useAppSelector(selectTrackpoints)
  const current = useAppSelector(selectCurrent)
  const play = useAppSelector(selectPlay)
  const timing = useAppSelector(selectTiming)
  const autoCenter = useAppSelector(selectAutoCenter)

  const dispatch = useAppDispatch()

  const [position, setPosition] = useState<LatLngTuple>([
    trackpoints[0].lat,
    trackpoints[0].lon,
  ])

  useEffect(() => {
    if (trackpoints[current]) {
      setPosition([
        trackpoints[current].lat,
        trackpoints[current].lon,
        trackpoints[current].ele,
      ])
    }
  }, [current])

  const markerRef = useRef()

  useEffect(() => {
    let timer: number | null = null
    if (trackpoints.length - 1 > current) {
      if (play) {
        timer = window.setTimeout(() => {
          dispatch(nextPosition())
        }, timing)
      }
    }
    return () => {
      if (timer) {
        clearTimeout(timer)
      }
    }
  }, [play, current])

  useEffect(() => {
    dispatch(setCurrentTrackpoint(trackpoints[current]))
  }, [current])

  return (
    <>
      <MapContainer
        className="MapContainer"
        center={position}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer
          url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
          attribution='Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
        />
        {position && (
          <>
            <Marker
              position={position}
              icon={customMarker}
              ref={() => markerRef}
            />

            <Polyline
              positions={trackpoints.map(polylinePointsFromTrackPoint)}
              color="rgb(250, 0, 0, .4)"
            />

            <Polyline
              positions={trackpoints
                .slice(0, current)
                .map(polylinePointsFromTrackPoint)}
              color="rgb(255,0,0)"
            />
          </>
        )}

        {autoCenter && <RecenterMap position={position} />}
      </MapContainer>
      <Cockpit />
    </>
  )
}

export default App
