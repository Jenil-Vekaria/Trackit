import axios from "axios";
import AuthService from "./auth-service";

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
        return response.data.projects;
    } catch (error) {
        console.error(error);
    }
};


const ProjectService = {
    getMyProjects
};

export default ProjectService;