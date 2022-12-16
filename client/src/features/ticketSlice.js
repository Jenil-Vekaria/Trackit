import { createSlice } from "@reduxjs/toolkit";

export const ticketSlice = createSlice({
    name: "ticket",
    initialState: {
        data: []
    },
    reducers: {
        setTickets: (state, action) => {
            state.data = action.payload;
        },
        addTicket: (state, action) => {
            state.data.push(action.payload);
        },
        clearTickets: (state, action) => {
            state.data = [];
        },
        setTicket: (state, action) => {
            state.data = state.data.map(ticket => {
                if (ticket._id === action.payload._id) return action.payload;
                return ticket;
            });
        },
        removeTicket: (state, action) => {
            state.data = state.data.filter(ticket => {
                return ticket._id !== action.payload.ticketId;
            });
        }
    }
});

export const { setTickets, setTicket, addTicket, clearTickets, removeTicket } = ticketSlice.actions;

export const getTickets = (state) => state.ticket.data;

export default ticketSlice.reducer;