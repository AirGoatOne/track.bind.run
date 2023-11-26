import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState, AppThunk } from "../../app/store"
import { fetchCount } from "./gpxAPI"
import { GpxState, TrackPoint } from "../../types/types"
import trackpointsExample from "../../example/trackpoints.json"

const initialState: GpxState = {
  trackpoints: trackpointsExample,
  name: "MNT 23 - Example",
}

export const incrementAsync = createAsyncThunk(
  "counter/fetchCount",
  async (amount: number) => {
    const response = await fetchCount(amount)
    // The value we return becomes the `fulfilled` action payload
    return response.data
  },
)

export const gpxSlice = createSlice({
  name: "gpx",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    load: (
      state,
      action: PayloadAction<{ trackpoints: TrackPoint[]; name: string }>,
    ) => {
      const { trackpoints, name } = action.payload
      state.trackpoints = trackpoints
      state.name = name
    },
  },
})

export const { load } = gpxSlice.actions

export const selectTrackpoints = (state: RootState) => state.gpx.trackpoints
export const selectGpxName = (state: RootState) => state.gpx.name

export default gpxSlice.reducer
