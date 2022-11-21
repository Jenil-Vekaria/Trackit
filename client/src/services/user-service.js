import axios from "axios";
import AuthService from "./auth-service";

const API = axios.create({ baseURL: process.env.REACT_APP_API_ENDPOINT + "/user" });

API.interceptors.request.use((req) => {
    const { accessToken } = AuthService.getCurrentUser();

    if (accessToken)
        req.headers["x-access-token"] = accessToken;

    return req;
});

const getUsers = async () => {
    try {
        const signedInUserID = AuthService.getCurrentUser().id;
        const response = await API.get("/");
        const users = response.data.users.filter(user => {
            return user._id !== signedInUserID;
        });

        return users;
    } catch (error) {
        console.error(error);
    }
};

const UserService = {
    getUsers
};

export default UserService;