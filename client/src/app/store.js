// This file will globally hold all the reducers
import { configureStore } from "@reduxjs/toolkit";
// import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";
import authReducer from "../features/authSlice";
import projectSlice from "../features/projectSlice";


export default configureStore({
    reducer: {
        auth: authReducer,
        project: projectSlice
    }
});