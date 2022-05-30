import { configureStore } from '@reduxjs/toolkit'
import dragDropSlice from '../DragDrop/dragDropSlice'

export const store = configureStore({
  reducer: {
    position: dragDropSlice,
  },
})