import { createReducer } from "@reduxjs/toolkit";
import { toggleEditing, setTitle } from "./actions";
import { ColumnData } from "./types";

const initialState: ColumnData[] = [
    { id: 1, title: "TODO" },
    { id: 2, title: "In Progress" },
    { id: 3, title: "Testing" },
    { id: 4, title: "Done" },
];

const columnReducer = createReducer(initialState, builder => {
    builder
        .addCase(toggleEditing, (state, action) => {
            const column = state.find((col) => col.id === action.payload);
            if (column) {
                column.isEditing = !column.isEditing;
            }
        })
        .addCase(setTitle, (state, action) => {
            const column = state.find((col) => col.id === action.payload.id);
            if (column) {
                column.currentTitle = action.payload.title;
            }
        });
});

export default columnReducer;
