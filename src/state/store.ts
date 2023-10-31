import { configureStore } from "@reduxjs/toolkit";
import columnReducer from "../state/ducks/columns/reducers";

export default configureStore({
    reducer: {
        column: columnReducer,
    },
});
