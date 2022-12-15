import axios from "axios";
import AuthService from "./auth-service";
import { setTicketType } from "../features/ticketTypeSlice";

const API = axios.create({ baseURL: process.env.REACT_APP_API_ENDPOINT + "/ticketType" });

API.interceptors.request.use((req) => {
    const { accessToken } = AuthService.getCurrentUser();

    if (accessToken)
        req.headers["x-access-token"] = accessToken;

    return req;
});


const getTicketType = () => async (dispatch) => {
    try {
        const { data } = await API.get("/");
        dispatch(setTicketType(data.ticketType));
    } catch (error) {
        console.error(error);
    }
};

const TicketTypeService = {
    getTicketType
};

export default TicketTypeService;
