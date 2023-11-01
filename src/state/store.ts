import { configureStore, combineReducers } from "@reduxjs/toolkit";
import columnReducer from "../state/ducks/columns/reducers";
import taskReducer from "./ducks/tasks/reducers";
import userNameReducer from "./ducks/userName/reducers";

import { persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootRedicer = combineReducers({
    column: columnReducer,
    task: taskReducer,
    userName: userNameReducer,
});

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootRedicer);

const  store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});


export  const persistor = persistStore(store)
export default store;
