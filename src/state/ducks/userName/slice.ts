import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Name } from "./types";

const initialState: Name = {
  name: "",
};

const userNameSlice = createSlice({
  name: "userName",
  initialState,
  reducers: {
    addName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
  },
});

export const { addName } = userNameSlice.actions;
export default userNameSlice;
