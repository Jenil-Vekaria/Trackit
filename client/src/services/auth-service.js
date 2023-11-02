import axios from "axios";
import decode from 'jwt-decode';
import { setLogin } from "../features/authSlice.js";
import { store, persistor } from "../store/store.js";

const API_URL = process.env.NEXT_PUBLIC_API_ENDPOINT + "/auth";

const signup = async (user) => {
    /*
        @param - user
        firstName
        lastName
        email
        password
        confirmPassword
    */
    try {
        await axios.post(API_URL + "/signup", user);
    } catch (error) {
        throw error.response.data.message;
    }
};

const login = async (user) => {
    /*
        @param - user
        email
        password
    */
    try {
        const { data } = await axios.post(API_URL + "/login", user);
        if (data.accessToken) {
            store.dispatch(setLogin(data));
        }
    } catch (error) {
        throw error.response.data.message;
    }
};

const logout = () => {
    persistor.purge();
    window.location.reload();
};

const getCurrentUser = () => {
    const state = store.getState();
    return state.auth.user;
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