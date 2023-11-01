import { configureStore } from "@reduxjs/toolkit";
import columnReducer from "../state/ducks/columns/reducers";
import taskReducer from "./ducks/tasks/reducers";
import userNameReducer from "./ducks/userName/reducers";

export default configureStore({
    reducer: {
        column: columnReducer,
        task: taskReducer,
        userName: userNameReducer,
    },
});
