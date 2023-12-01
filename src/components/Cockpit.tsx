import { IoChevronDown, IoChevronUp } from "react-icons/io5"
import { useAppSelector } from "../app/hooks"
import Controls from "../features/controls/Controls"
import { selectCurrentTrackpoint } from "../features/controls/controlsSlice"
import GpxUpload from "../features/gpx-upload/GpxUpload"
import { selectGpxName } from "../features/gpx-upload/gpxSlice"
import Altitude from "./Altitude"
import "./Cockpit.css"
import Direction from "./Direction"
import Elevation from "./Elevation"
import { useState } from "react"
import clsx from "clsx"

export default function Cockpit() {
  const name = useAppSelector(selectGpxName)
  const currentTrackpoint = useAppSelector(selectCurrentTrackpoint)
  const [expandControls, setExpandControls] = useState(false)
  function toggleExpand() {
    setExpandControls(!expandControls)
  }
  return (
    <div className="Cockpit" role="table">
      <div
        role="row"
        className={clsx("Cockpit-controls", { open: expandControls })}
      >
        <div role="cell" className="track-name">
          <h3>{name}</h3>
          <div className="open-close" onClick={() => toggleExpand()}>
            {!expandControls && <IoChevronUp />}
            {expandControls && <IoChevronDown />}
          </div>
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
