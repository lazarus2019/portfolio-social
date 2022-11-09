import { createSlice } from "@reduxjs/toolkit";
import userSlice from "./userSlice";

const initialState = {};

const boardSlice = createSlice({
    name: "board",
    initialState,
    reducers: {
        setBoard: (state, action)=>{
            state.value = action?.payload
        }
    }
})

export const {setBoard} = boardSlice.actions

export default userSlice.reducer