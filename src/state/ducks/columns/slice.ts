import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ColumnData } from "./types";

const initialState: ColumnData[] = [
  { id: 1, title: "TODO" },
  { id: 2, title: "In Progress" },
  { id: 3, title: "Testing" },
  { id: 4, title: "Done" },
];

const columnSlice = createSlice({
  name: "column",
  initialState,
  reducers: {
    toggleEditing(state, action: PayloadAction<number>) {
      const column = state.find((col) => col.id === action.payload);
      if (column) {
        column.isEditing = !column.isEditing;
      }
    },
    setTitle(state, action: PayloadAction<{ id: number; title: string }>) {
      const column = state.find((col) => col.id === action.payload.id);
      if (column) {
        column.title = action.payload.title;
      }
    },
  },
});

export const { toggleEditing, setTitle } = columnSlice.actions;
export default columnSlice;
