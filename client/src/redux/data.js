import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    data:[]
};

export const Data = createSlice({
  name: "data",
  initialState,
  reducers: {
    getImage: (state, action) => {
      state.data = action.payload
    },
  },
});

export const { getImage } = Data.actions;

export default Data.reducer;