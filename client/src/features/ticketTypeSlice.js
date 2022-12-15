import { createSlice } from "@reduxjs/toolkit";

export const ticketTypeSlice = createSlice({
    name: "ticketType",
    initialState: {
        ticketType: []
    },
    reducers: {
        setTicketType: (state, action) => {
            state.ticketType = action.payload;
        }
    }
});

export const { setTicketType } = ticketTypeSlice.actions;

export const getTicketType = (state) => state.ticketType.ticketType;

export default ticketTypeSlice.reducer;