import { createSlice } from "@reduxjs/toolkit";
import AuthService from "../services/auth-service";

export const miscellaneousSlice = createSlice({
    name: "miscellaneous",
    initialState: {
        ticketType: {},
        users: [],
        userMapping: {}
    },
    reducers: {
        setTicketType: (state, action) => {
            action.payload.forEach(ticketType => state.ticketType[ticketType._id] = ticketType);
        },
        setUsers: (state, action) => {
            state.users = action.payload;
            action.payload.forEach(user => state.userMapping[user._id] = user.fullName);
        }
    }
});

export const { setTicketType, setUsers } = miscellaneousSlice.actions;

export const getTicketType = (state) => state.miscellaneous.ticketType;

export const getUsers = (includeSignedUser = false) => (state) => {
    const { id } = AuthService.getCurrentUser();
    return includeSignedUser ? state.miscellaneous.users : state.miscellaneous.users.filter(user => user._id !== id);
};

export default miscellaneousSlice.reducer;