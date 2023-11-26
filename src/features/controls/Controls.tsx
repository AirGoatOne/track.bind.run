import { useAppDispatch, useAppSelector } from "../../app/hooks"
import {
  selectAutoCenter,
  selectPlay,
  selectTiming,
  skipBack,
  skipForward,
  toggleAutoCenter,
  togglePlay,
  setTiming,
} from "./controlsSlice"

import {
  IoPlay,
  IoPause,
  IoPlaySkipBack,
  IoPlaySkipForward,
} from "react-icons/io5"

import "./Controls.css"

const Controls: React.FC = () => {
  const playing = useAppSelector(selectPlay)
  const autoCenter = useAppSelector(selectAutoCenter)
  const dispatch = useAppDispatch()
  const timing = useAppSelector(selectTiming)

  function handleTimingChange(t: string) {
    const timingValue = Number(t)
    if (timingValue) {
      dispatch(setTiming(timingValue))
    }
  }

  return (
    <div className="Controls">
      <div>
        <button
          onClick={() => {
            dispatch(skipBack())
          }}
        >
          <IoPlaySkipBack />
        </button>
        <button onClick={() => dispatch(togglePlay())}>
          {playing ? <IoPause /> : <IoPlay />}
        </button>
        <button
          onClick={() => {
            dispatch(skipForward())
          }}
        >
          <IoPlaySkipForward />
        </button>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            onChange={() => dispatch(toggleAutoCenter())}
            checked={autoCenter}
          />{" "}
          Auto Center
        </label>
      </div>
      <div>
        <label>
          <input
            type="number"
            min="50"
            size={6}
            value={timing}
            onChange={(e) => handleTimingChange(e.currentTarget.value)}
          />{" "}
          Timer (ms)
        </label>
      </div>
    </div>
  )
}

export default Controls
