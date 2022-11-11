import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const boardFavoriteSlice = createSlice({
  name: "boardFavorite",
  initialState,
  reducers: {
    setFavoritesBoardList: (state, action) => {
      state.value = action?.payload;
    },
  },
});

export const { setFavoritesBoardList } = boardFavoriteSlice.actions;

export default boardFavoriteSlice.reducer;
