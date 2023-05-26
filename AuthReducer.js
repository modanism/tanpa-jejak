import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        auth : []
    },
    reducers: {
        setAuth: (state, action) => {
            state.auth.unshift({...action.payload})
        }
    }
})

export const {setAuth} = authSlice.actions

export default authSlice.reducer