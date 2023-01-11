import { createSlice } from "@reduxjs/toolkit";

export const projectSlice = createSlice({
    name: "project",
    initialState: {
        data: []
    },
    reducers: {
        setProjects: (state, action) => {
            state.data = action.payload;
        },
        setProject: (state, action) => {
            state.data = state.data.map(project => {
                if (project._id === action.payload._id) return action.payload;
                return project;
            });
        }
    }
});

export const { setProjects, setProject } = projectSlice.actions;

export const getProjects = (state) => state.project.data;
export const getProjectInfo = (projectId) => (state) => state.project.data.filter(project => project._id === projectId)[0];
export default projectSlice.reducer;