import {createReducer} from "@reduxjs/toolkit";
import {addName} from "./actions";
import {Name} from "./types";

const initialState:Name = {
    name: '',
}
const userNameReducer = createReducer(initialState, builder => {
    builder
        .addCase(addName, (state, action) => {
            const userName = action.payload;
            state.name = userName;
        })
})

export default userNameReducer;