import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import boardReducer from './slices/boardSlice'
const store = configureStore({
  reducer: {
    user: userReducer,
    board: boardReducer,
  },
});

export default store;
