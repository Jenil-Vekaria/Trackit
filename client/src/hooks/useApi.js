import AuthService from "@/services/auth-service";
import axios from "axios";
import useSWR from "swr";

const API = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT });

API.interceptors.request.use((req) => {
    const { accessToken } = AuthService.getCurrentUser();

    if (accessToken)
        req.headers["x-access-token"] = accessToken;

    return req;
});

const useApi = (getApiRequestInfo, ...args) => {
    const apiRequestInfo = getApiRequestInfo(...args);

    const key = apiRequestInfo.method + "-" + apiRequestInfo.url; //getApiRequestInfo is a function and name will be used as unique key

    const swr = useSWR(key, () => api(apiRequestInfo), {
        shouldRetryOnError: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    });

    const api = async (requestInfo) => {
        const res = await API(requestInfo);
        return res.data;
    };

    const mutateServer = async (mutationApiRequestInfo) => {
        try {
            await swr.mutate(getMutation(mutationApiRequestInfo, swr.data), getMutationOptions(mutationApiRequestInfo, swr.data));
        } catch (error) {
            console.log(error);
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