import axios from "axios";
import decode from 'jwt-decode';
import { store, persistor } from "../store/store.js";
import useAuthStore from "@/hooks/useAuth.js";

const API_URL = process.env.NEXT_PUBLIC_API_ENDPOINT + "/auth";

const signup = (data) => {
    return {
        url: "/auth/signup",
        method: "post",
        data
    };
};

const login = (data) => {
    return {
        url: "/auth/login",
        method: "post",
        data
    };
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
    const authStore = useAuthStore.getState();

    const token = authStore.accessToken;

    if (authStore.accessToken === null || authStore.userProfile === null) {
        return false;
    }

    if (token) {
        const decodeToken = decode(token);

        if (decodeToken.exp * 1000 < new Date().getTime())
            return false;
        else
            return true;
    }

    return false;
};

const AuthService = {
    signup,
    login,
    logout,
    getCurrentUser,
    isAuthorized
};

export default AuthService;