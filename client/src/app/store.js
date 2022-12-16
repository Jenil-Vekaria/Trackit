// This file will globally hold all the reducers
import { configureStore } from "@reduxjs/toolkit";
import {
    persistStore,
    persistCombineReducers,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from "../features/authSlice";
import miscellaneousSlice from "../features/miscellaneousSlice";
import projectSlice from "../features/projectSlice";
import ticketSlice from "../features/ticketSlice";

const persistConfig = {
    key: 'root',
    storage,
    version: 1
};

// ? Add the reducers here
const rootReducer = {
    auth: authReducer,
    project: projectSlice,
    miscellaneous: miscellaneousSlice,
    ticket: ticketSlice,
};

const persistCombinedReducers = persistCombineReducers(persistConfig, rootReducer);

let store = configureStore({
    reducer: persistCombinedReducers,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});
let persistor = persistStore(store);

export { store, persistor };