import { configureStore } from "@reduxjs/toolkit";
import columnReducer from "../state/columns/reducers";

export default configureStore({
    reducer: {
        column: columnReducer,
    },
});
