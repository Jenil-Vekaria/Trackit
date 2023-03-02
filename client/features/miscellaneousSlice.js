import { createSlice } from "@reduxjs/toolkit";
import AuthService from "../services/auth-service";

export const miscellaneousSlice = createSlice({
    name: "miscellaneous",
    initialState: {
        ticketType: [],
        users: [],
        roles: []
    },
    reducers: {
        setTicketTypes: (state, action) => {
            state.ticketType = action.payload;
        },
        setTicketType: (state, action) => {
            state.ticketType = state.ticketType.map(ticketType => {
                if (ticketType._id === action.payload._id) return action.payload;
                return ticketType;
            });
        },
        addTicketType: (state, action) => {
            state.ticketType.push(action.payload);
        },
        removeTicketType: (state, action) => {
            state.ticketType = state.ticketType.filter(ticketType => ticketType.name !== action.payload);
        },
        setUsers: (state, action) => {
            state.users = action.payload;
        },
        setUser: (state, action) => {
            state.users = state.users.map(user => {
                if (user._id === action.payload._id) return action.payload;
                return user;
            });
        },
        setRoles: (state, action) => {
            state.roles = action.payload;
        },
        addRole: (state, action) => {
            state.roles.push(action.payload);
        },
        removeRole: (state, action) => {
            state.roles = state.roles.filter(role => role._id !== action.payload);
        },
        setRole: (state, action) => {
            state.roles = state.roles.map(role => {
                if (role._id === action.payload._id) return action.payload;
                return role;
            });
        }
    }
});

export const { setTicketTypes, setTicketType, addTicketType, removeTicketType, setUsers, setUser, setRole, setRoles, addRole, removeRole } = miscellaneousSlice.actions;

export const getTicketType = (state) => state.miscellaneous.ticketType;

export const getUsers = (includeSignedUser = false) => (state) => {
    const { _id } = AuthService.getCurrentUser();
    return includeSignedUser ? state.miscellaneous.users : state.miscellaneous.users.filter(user => user._id !== _id);
};

export const getRoles = (state) => state.miscellaneous.roles;

export default miscellaneousSlice.reducer;