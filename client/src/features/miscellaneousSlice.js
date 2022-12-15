import { createSlice } from "@reduxjs/toolkit";

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
export const getUsers = (state) => state.miscellaneous.users;

export default miscellaneousSlice.reducer;