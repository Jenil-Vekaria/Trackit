import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null
    },
    reducers: {
        setLogin: (state, action) => {
            state.user = action.payload;
        },
        setLogout: (state) => {
            state.user = null;
        }
    }
});

export const { setLogin, setLogout } = authSlice.actions;

export const getUser = (state) => state.auth.user;

export default authSlice.reducer;