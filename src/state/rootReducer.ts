import { combineReducers } from "@reduxjs/toolkit";
import columnReducer from "../state/ducks/columns/reducers";
import taskReducer from "./ducks/tasks/reducers";
import userNameReducer from "./ducks/userName/reducers";

const rootReducer = combineReducers({
    column: columnReducer,
    task: taskReducer,
    userName: userNameReducer,
});

export default rootReducer;
