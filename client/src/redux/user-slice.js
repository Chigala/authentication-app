

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const userDataUrl = "http://localhost:5000/profile/"
export const getUser = createAsyncThunk("users/getUser", async () => {
  const response = await axios.get(userDataUrl, {withCredentials:true});
  return response.data;
});

const initialState =  {
    data:[], 
    pending: null,
    error: null, 
  }

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,//normally I would have just writtern initial state alone, but I want to make it as clear as possible.
  extraReducers: {
    [getUser.pending]: (state) => {
      state.pending = true;
      state.error = false;
    },
    [getUser.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.pending = false;
    },
    [getUser.rejected]: (state) => {
      state.pending = false;
      state.error = true;
    },
  },
});


export default userSlice.reducer;