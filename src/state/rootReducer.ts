import { combineReducers } from "@reduxjs/toolkit";
import columnSlice from "./ducks/columns/slice";
import taskSlice from "./ducks/tasks/slice";
import userNameSlice from "./ducks/userName/slice";

const rootReducer = combineReducers({
  column: columnSlice.reducer,
  task: taskSlice.reducer,
  userName: userNameSlice.reducer,
});

export default rootReducer;
