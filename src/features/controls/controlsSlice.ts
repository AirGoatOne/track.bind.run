import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"
import { ControlsState, TrackPoint } from "../../types/types"

const initialState: ControlsState = {
  current: 0,
  play: true,
  autoCenter: true,
  timing: 500,
}

export const controlsSlice = createSlice({
  name: "gpx",
  initialState,
  reducers: {
    togglePlay: (state) => {
      state.play = !state.play
    },
    toggleAutoCenter: (state) => {
      state.autoCenter = !state.autoCenter
    },
    setTiming: (state, action: PayloadAction<number>) => {
      state.timing = action.payload
    },
    nextPosition: (state) => {
      state.current = state.current + 1
    },
    skipBack: (state) => {
      state.play = false
      state.current--
    },
    skipForward: (state) => {
      state.play = false
      state.current++
    },
    setCurrentTrackpoint: (state, action: PayloadAction<TrackPoint>) => {
      state.currentTrackpoint = action.payload
    },
  },
})

export const {
  togglePlay,
  toggleAutoCenter,
  nextPosition,
  skipBack,
  skipForward,
  setTiming,
  setCurrentTrackpoint,
} = controlsSlice.actions

export const selectPlay = (state: RootState) => state.controls.play
export const selectAutoCenter = (state: RootState) => state.controls.autoCenter
export const selectTiming = (state: RootState) => state.controls.timing
export const selectCurrent = (state: RootState) => state.controls.current
export const selectCurrentTrackpoint = (state: RootState) =>
  state.controls.currentTrackpoint

export default controlsSlice.reducer
