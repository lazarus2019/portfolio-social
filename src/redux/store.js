import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import boardReducer from "./slices/boardSlice";
import boardFavoriteReducer from "./slices/boardFavoriteSlice";
const store = configureStore({
  reducer: {
    user: userReducer,
    boards: boardReducer,
    boardFavorite: boardFavoriteReducer,
  },
});

export default store;
