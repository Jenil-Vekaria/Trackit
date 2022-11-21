import axios from "axios";
import AuthService from "./auth-service";
import { setProjects } from "../features/projectSlice";

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

const getProjectInfo = async (projectId) => {
    try {
        const response = await API.get(`/${projectId}`);
        return response.data.project[0];
    } catch (error) {
        console.error(error);
    }
};


const ProjectService = {
    getMyProjects,
    addProject,
    getProjectInfo
};

export default ProjectService;