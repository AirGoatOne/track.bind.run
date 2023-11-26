import { useEffect, useState } from "react"
import "./Elevation.css"
import clsx from "clsx"
import { useSelector } from "react-redux"
import { selectTrackpoints } from "../features/gpx-upload/gpxSlice"
import { useAppSelector } from "../app/hooks"
import { selectCurrent } from "../features/controls/controlsSlice"

const Elevation: React.FC = () => {
  const trackpoints = useSelector(selectTrackpoints)
  const current = useAppSelector(selectCurrent)
  const [trend, setTrend] = useState("stable")
  const elevation = trackpoints.slice(0, current).map((tp) => tp.ele)
  const [positiveElevation, negativeElevation] = elevation.reduce(
    (acc, curr, idx, arr) => {
      if (arr[idx - 1]) {
        // positive elevation
        if (arr[idx - 1] < curr) {
          const positiveEle = acc[0] + (curr - arr[idx - 1])
          return [positiveEle, acc[1]]
        }
        // negative elevation
        if (arr[idx - 1] > curr) {
          const negativeEle = acc[1] + (curr - arr[idx - 1])
          return [acc[0], negativeEle]
        }
      }
      return [...acc]
    },
    [0, 0],
  )

  useEffect(() => {
    const [prevEle, currEle] = elevation.slice(-2)
    if (prevEle < currEle) {
      setTrend("up")
    } else if (prevEle > currEle) {
      setTrend("down")
    } else {
      setTrend("stable")
    }
  }, [elevation])

  return (
    <div className={clsx("Elevation", trend)}>
      <pre data-testid="positive" className="up">
        +{positiveElevation}m
      </pre>
      <pre data-testid="negative" className="down">
        {negativeElevation}m
      </pre>
    </div>
  )
}

export default Elevation
