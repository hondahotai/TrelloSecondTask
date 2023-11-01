import { configureStore } from "@reduxjs/toolkit";
import columnReducer from "../state/ducks/columns/reducers";
import taskReducer from "./ducks/tasks/reducers";

export default configureStore({
    reducer: {
        column: columnReducer,
        task: taskReducer,
    },
});
