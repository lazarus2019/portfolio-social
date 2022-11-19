import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const boardSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    setBoards: (state, action) => {
      state.value = action?.payload;
    },
  },
});

export const { setBoards } = boardSlice.actions;

export default boardSlice.reducer;
