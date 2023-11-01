import {createAction} from "@reduxjs/toolkit";

export const addName = createAction<string>('userName/addName');