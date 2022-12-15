import { createSlice } from "@reduxjs/toolkit";

export const projectSlice = createSlice({
    name: "project",
    initialState: {
        data: []
    },
    reducers: {
        setProjects: (state, action) => {
            state.data = action.payload;
        }
    }
});

export const { setProjects } = projectSlice.actions;

export const getProjects = (state) => state.project.data;

export default projectSlice.reducer;