"use client"
import { configureStore } from "@reduxjs/toolkit"
import prefsReducer from "./prefsSlice"

export const store = configureStore({
  reducer: {
    prefs: prefsReducer
  }
})
