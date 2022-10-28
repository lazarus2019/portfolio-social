import keyStorage from "@/constants";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.value = action?.payload;
    },
    logout: (state, action) => {
      localStorage.removeItem(keyStorage.TOKEN_KEY);
      state.value = undefined;
    },
  },
});

export const { setUser, logout } = userSlice.actions;

export default userSlice.reducer;
