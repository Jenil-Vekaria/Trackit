import AuthService from "@/services/auth-service";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";

const API = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT });

API.interceptors.request.use((req) => {
    const { accessToken } = AuthService.getCurrentUser();

    if (accessToken)
        req.headers["x-access-token"] = accessToken;

    return req;
});

const usePost = ({ type, url }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const post = useCallback((payload) => {
        setLoading(true);
        API({
            method: type,
            url,
            data: payload
        })
            .then(response => {
                setData(response.data);
            })
            .catch(err => {
                setError(err.response.data.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [url]);


    return {
        data,
        loading,
        error,
        post
    };

};

export default usePost;

