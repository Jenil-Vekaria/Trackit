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
            console.log("ERROR: ", error);
            throw error.response.data.message;
        }
    };

    const getMutationOptions = (mutationApiRequestInfo, oldData) => {
        let optimisticData;
        const mutateData = mutationApiRequestInfo.data;

        switch (mutationApiRequestInfo.method) {
            case "post":
                optimisticData = [mutateData, ...oldData];
            case "patch":
                optimisticData = oldData.map(data => data._id === mutateData._id ? mutateData : data);
            case "delete":
                const splitUrl = mutationApiRequestInfo.url.split("/");
                const id = splitUrl.pop();
                optimisticData = oldData.filter(data => data._id !== id);
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


        switch (mutationApiRequestInfo.method) {
            case "post":
                return [responseData, ...oldData];
            case "patch":
                return oldData.map(data => data._id === responseData._id ? responseData : data);
            case "delete":
                const splitUrl = mutationApiRequestInfo.url.split("/");
                const id = splitUrl.pop();
                return oldData.filter(data => data._id !== id);
            default:
                return oldData;
        }

    };

    return { ...swr, mutateServer };
};

export default useApi;