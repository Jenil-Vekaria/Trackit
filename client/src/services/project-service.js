import axios from "axios";
import AuthService from "./auth-service";
import { setProject, setProjects, addProject } from "../features/projectSlice";
import { store } from "../app/store.js";

const API = axios.create({ baseURL: process.env.REACT_APP_API_ENDPOINT + "/project" });

API.interceptors.request.use((req) => {
    const { accessToken } = AuthService.getCurrentUser();

    if (accessToken)
        req.headers["x-access-token"] = accessToken;

    return req;
});

const getMyProjects = async () => {
    try {
        const response = await API.get("/");
        store.dispatch(setProjects(response.data.projects));
    } catch (error) {
        console.error(error);
    }
};

const createProject = async (data) => {
    try {
        const response = await API.post("/", data);
        store.dispatch(addProject(response.data.newProject));
    } catch (error) {
        console.error(error);
        throw error.response.data.message;
    }
};

const updateProject = async (data) => {
    try {
        const response = await API.patch(`/${data._id}`, data);
        store.dispatch(setProject(response.data.project));
        return response.data.project;
    } catch (error) {
        console.error(error);
        throw error.response.data.message;
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
        throw error.response.data.message;
    }
};

const getProjectTitle = (projectId) => {
    const state = store.getState();
    const myProjects = state.project.data;
    const project = myProjects.filter(project => project._id === projectId);

    return project[0]?.title || "";
};

const getProjectStats = async (projectId) => {
    try {
        const { data } = await API.get(`/stat/${projectId}`);

        return data.stat;
    } catch (error) {
        console.error(error);

    }
};

const getProjectAssignees = (projectId) => {
    if (!projectId)
        return;

    const state = store.getState();
    const [project] = state.project.data.filter(project => project._id === projectId);

    const projectAssignees = state.miscellaneous.users.filter(user => project.assignees.includes(user._id));

    return projectAssignees;
};

const ProjectService = {
    getMyProjects,
    createProject,
    getProjectInfo,
    updateProject,
    deleteProject,
    getProjectTitle,
    getProjectStats,
    getProjectAssignees
};

export default ProjectService;