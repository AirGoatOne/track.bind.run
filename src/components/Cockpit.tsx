import { useAppSelector } from "../app/hooks"
import Controls from "../features/controls/Controls"
import { selectCurrentTrackpoint } from "../features/controls/controlsSlice"
import GpxUpload from "../features/gpx-upload/GpxUpload"
import { selectGpxName } from "../features/gpx-upload/gpxSlice"
import Altitude from "./Altitude"
import "./Cockpit.css"
import Direction from "./Direction"
import Elevation from "./Elevation"

export default function Cockpit() {
  const name = useAppSelector(selectGpxName)
  const currentTrackpoint = useAppSelector(selectCurrentTrackpoint)
  return (
    <div className="Cockpit" role="table">
      <div role="row">
        <div role="cell" className="track-name">
          <h3>{name}</h3>
        </div>
        <div role="cell">
          <Controls />
        </div>
        <div role="cell">
          <GpxUpload />
        </div>
      </div>
      <div role="row">
        <div role="cell" style={{ borderRight: "none" }}>
          {currentTrackpoint && <Altitude altitude={currentTrackpoint.ele} />}
        </div>
        <div role="cell">{currentTrackpoint && <Elevation />}</div>
        <div role="cell">
          <Direction />
        </div>
      </div>
    </div>
  )
}
