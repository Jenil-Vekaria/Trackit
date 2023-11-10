import AuthService from "@/services/auth-service";
import axios from "axios";
import useSWR from "swr";
import useAuthStore from "./useAuth";

const API = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT });

API.interceptors.request.use((req) => {
    const accessToken = useAuthStore.getState().accessToken;

    if (accessToken)
        req.headers["x-access-token"] = accessToken;

    return req;
});


const useApi = (apiRequestInfo, shouldFetch = true, revalidateIfStale = true) => {

    let key = "";
    let fetcher = () => null;

    if (apiRequestInfo) {
        key = apiRequestInfo.method + "-" + apiRequestInfo.url; //getApiRequestInfo is a function and name will be used as unique key
        fetcher = () => api(apiRequestInfo);
    }
    else {
        key = "api-request";
    }


    const swr = useSWR(shouldFetch ? key : null, fetcher, {
        shouldRetryOnError: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        revalidateIfStale
    });

    const api = async (requestInfo) => {
        const res = await API(requestInfo);
        return res.data;
    };

    const mutateServer = async (mutationApiRequestInfo) => {
        try {
            await swr.mutate(getMutation(mutationApiRequestInfo, swr.data), getMutationOptions(mutationApiRequestInfo, swr.data));
        } catch (error) {
            console.error(error);
            throw error.response.data.message;
        }
    };

    const getMutationOptions = (mutationApiRequestInfo, oldData) => {
        let optimisticData;
        const mutateData = mutationApiRequestInfo.data;
        const isArray = Array.isArray(oldData);

        switch (mutationApiRequestInfo.method) {
            case "post":
                optimisticData = isArray ? [mutateData, ...oldData] : mutateData;
            case "patch":
                optimisticData = isArray ? oldData.map(data => data._id === mutateData._id ? mutateData : data) : mutateData;
            case "delete":
                const splitUrl = mutationApiRequestInfo.url.split("/");
                const id = splitUrl.pop();
                optimisticData = isArray ? oldData.filter(data => data._id !== id) : mutateData;
            default:
                optimisticData = oldData;
        }

        return {
            optimisticData,
            populateCache: true,
            revalidate: false,
            rollbackOnError: true,
        };
    };

    const getMutation = async (mutationApiRequestInfo, oldData) => {
        const responseData = await api(mutationApiRequestInfo);
        const isArray = Array.isArray(oldData);

        switch (mutationApiRequestInfo.method) {
            case "post":
                return isArray ? [responseData, ...oldData] : responseData;
            case "patch":
                return isArray ? oldData.map(data => data._id === responseData._id ? responseData : data) : responseData;
            case "delete":
                const splitUrl = mutationApiRequestInfo.url.split("/");
                const id = splitUrl.pop();
                return isArray ? oldData.filter(data => data._id !== id) : oldData;
            default:
                return oldData;
        }

    };

    return { ...swr, mutateServer };
};

export default useApi;