import { createSlice } from "@reduxjs/toolkit";
import AuthService from "../services/auth-service";

export const miscellaneousSlice = createSlice({
    name: "miscellaneous",
    initialState: {
        ticketType: [],
        users: []
    },
    reducers: {
        setTicketType: (state, action) => {
            state.ticketType = action.payload;
        },
        setUsers: (state, action) => {
            state.users = action.payload;
        }
    }
});

export const { setTicketType, setUsers } = miscellaneousSlice.actions;

export const getTicketType = (state) => state.miscellaneous.ticketType;
export const getUsers = (state) => {
    const { id } = AuthService.getCurrentUser();
    return state.miscellaneous.users.filter(user => user._id !== id);
};

export default miscellaneousSlice.reducer;