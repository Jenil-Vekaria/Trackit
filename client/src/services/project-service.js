import axios from "axios";
import AuthService from "./auth-service";
import { setProject, setProjects, addProject } from "../features/projectSlice";
import { store } from "../store/store.js";

const API = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT + "/project" });
const ALL_USERS_API = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT + "/user/all" });

API.interceptors.request.use((req) => {
    const { accessToken } = AuthService.getCurrentUser();

    if (accessToken)
        req.headers["x-access-token"] = accessToken;

    return req;
});

const getMyProjects = () => {
    return {
        url: `/project`,
        method: "get"
    };
};

const createProject = (data) => {
    return {
        url: "/project",
        data,
        method: "post"
    };
};

const updateProject = (data, projectId) => {
    return {
        url: `/project/${projectId}`,
        data,
        method: "patch"
    };
};

const getProjectInfo = (projectId) => {
    return {
        mthod: "get",
        url: `/project/${projectId}`
    };
};

const deleteProject = (projectId) => {
    return {
        method: "delete",
        url: `/project/${projectId}`
    };
};

const getProjectStats = (projectId) => {
    return {
        method: "get",
        url: `/project/stat/${projectId}`
    };
};

const ProjectService = {
    getMyProjects,
    createProject,
    getProjectInfo,
    updateProject,
    deleteProject,
    getProjectStats
};

export default ProjectService;