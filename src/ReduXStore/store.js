import { configureStore } from '@reduxjs/toolkit'

import counterReducer from '../ReduXStore/counterSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
})
