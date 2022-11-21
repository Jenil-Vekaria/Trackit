import { createSlice } from "@reduxjs/toolkit";

export const projectSlice = createSlice({
    name: "project",
    initialState: {
        projects: []
    },
    reducers: {
        setProjects: (state, action) => {
            state.projects = action.payload;
        }
    }
});

export const { setProjects } = projectSlice.actions;

export const getProjects = (state) => state.project.projects;

export default projectSlice.reducer;