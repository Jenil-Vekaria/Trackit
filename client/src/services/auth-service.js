import axios from "axios";

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
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
    signup,
    login,
    logout,
    getCurrentUser
};

export default AuthService;