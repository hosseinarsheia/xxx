import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  num: 0,
  age: 20,
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: state => {
      state.num += 1
    },
    decrement: state => {
      state.num -= 1
    },
    incrementByAmount: (state, action) => {
      state.num += action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer
