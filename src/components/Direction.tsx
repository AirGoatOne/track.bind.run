import { useEffect, useState } from "react"
import { useAppSelector } from "../app/hooks"
import { selectTrackpoints } from "../features/gpx-upload/gpxSlice"
import { calculateBearing } from "../utils/coords-utils"
import { selectCurrent } from "../features/controls/controlsSlice"

const Direction: React.FC = () => {
  const trackpoints = useAppSelector(selectTrackpoints)
  const current = useAppSelector(selectCurrent)
  const [direction, setDirection] = useState(0)

  useEffect(() => {
    if (current - 2 > 0) {
      const [pointA, pointB] = trackpoints.slice(current - 2)
      setDirection(
        calculateBearing(pointA.lat, pointA.lon, pointB.lat, pointB.lon),
      )
    }
  }, [current])
  return (
    <>
      <div style={{ position: "relative" }}>
        <small
          style={{
            fontSize: "10px",
            textAlign: "center",
            position: "absolute",
            top: "-10px",
            width: "20px",
            height: "8px",
            display: "block",
          }}
        >
          N
        </small>
        <div
          style={{
            width: "20px",
            height: "20px",
            transform: `rotate(${direction}deg)`,
            transformOrigin: "center",
            textAlign: "center",
            display: "block",
            transition: "transform 100ms",
            // marginTop: "5px",
            position: "absolute",
            top: "3px",
          }}
        >
          ↑
        </div>
      </div>
      <pre
        style={{
          paddingLeft: "25px",
          width: "170px",
          textAlign: "right",
        }}
      >
        {direction}&deg;
      </pre>
    </>
  )
}

export default Direction
