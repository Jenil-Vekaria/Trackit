import axios from "axios";
import decode from 'jwt-decode';

const API_URL = process.env.REACT_APP_API_ENDPOINT + "/auth";

const signup = (user) => {
    /*
        @param - user
        firstName
        lastName
        email
        password
        confirmPassword
    */
    return axios.post(API_URL + "/signup", user)
        .then((response) => {
            if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }

            return response.data;
        });
};

const login = (user) => {
    /*
        @param - user
        email
        password
    */

    return axios.post(API_URL + "/login", user)
        .then((response) => {
            if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }

            return response.data;
        });
};

const logout = () => {
    localStorage.removeItem("user");
    window.location.replace("/");
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};

const isAuthorized = () => {
    const user = getCurrentUser();

    const token = user?.accessToken;
    let isAuthorized = false;

    if (token) {
        const decodeToken = decode(token);

        if (decodeToken.exp * 1000 < new Date().getTime())
            isAuthorized = false;
        else
            isAuthorized = true;
    }

    return isAuthorized;
};

const AuthService = {
    signup,
    login,
    logout,
    getCurrentUser,
    isAuthorized
};

export default AuthService;