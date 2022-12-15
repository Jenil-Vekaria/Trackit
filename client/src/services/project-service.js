import axios from "axios";
import AuthService from "./auth-service";
import { setProjects } from "../features/projectSlice";
import { store } from "../app/store.js";

const API = axios.create({ baseURL: process.env.REACT_APP_API_ENDPOINT + "/project" });

API.interceptors.request.use((req) => {
    const { accessToken } = AuthService.getCurrentUser();

    if (accessToken)
        req.headers["x-access-token"] = accessToken;

    return req;
});

const getMyProjects = () => async (dispatch) => {
    try {
        const response = await API.get("/");
        dispatch(setProjects(response.data.projects));
    } catch (error) {
        console.error(error);
    }
};

const addProject = async (data) => {
    try {
        const response = await API.post("/", data);
        return response;
    } catch (error) {
        throw error;
    }
};

const updateProject = async (data) => {
    try {
        const response = await API.patch(`/${data._id}`, data);
        return response;
    } catch (error) {
        throw error;
    }
};

const getProjectInfo = async (projectId) => {
    try {
        const { data: { project } } = await API.get(`/${projectId}`);

        return project;
    } catch (error) {
        console.error(error);
    }
};

const deleteProject = async (projectId) => {
    try {
        await API.delete(`/${projectId}`);
    } catch (error) {
        console.error(error);
    }
};

const getProjectAssigneeInfo = (assigneeIds) => {
    const state = store.getState();
    const allUsers = state.miscellaneous.users;

    return allUsers.filter(user => assigneeIds.includes(user._id));
};

const ProjectService = {
    getMyProjects,
    addProject,
    getProjectInfo,
    updateProject,
    deleteProject
};

export default ProjectService;