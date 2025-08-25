// store/prefsSlice.js
import { createSlice } from "@reduxjs/toolkit"

const prefsSlice = createSlice({
  name: "prefs",
  initialState: { selected: [] },
  reducers: {
    addPref: (state, action) => {
      if (!state.selected.includes(action.payload)) {
        state.selected.push(action.payload)
      }
    },
    removePref: (state, action) => {
      state.selected = state.selected.filter(p => p !== action.payload)
    },
    addCustomPref: (state, action) => {
      state.selected.push(action.payload)
    }
  }
})

export const { addPref, removePref, addCustomPref } = prefsSlice.actions
export default prefsSlice.reducer
