import { createAction } from "@reduxjs/toolkit";

export const toggleEditing = createAction<number>('column/toggleEditing');

export const setTitle = createAction<{ id: number; title: string }>('column/setTitle');
