import { createSlice } from "@reduxjs/toolkit";
import AuthService from "../services/auth-service";

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null
    },
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
        },
        logout: (state) => {
            console.info("ERASING");
            state.user = null;
            AuthService.logout();
        }
    }
});

export const { login, logout } = authSlice.actions;

export const selectUser = (state) => state.auth.user;

export default authSlice.reducer;