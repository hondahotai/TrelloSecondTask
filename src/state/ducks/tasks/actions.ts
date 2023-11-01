import {createAction} from "@reduxjs/toolkit";



export const modalIsOpen = createAction('task/modalIsOpen');

export const addTask = createAction<{ columnId: number; task: string }>('task/addTask');

export const editTaskTitle = createAction<{title: string; index:number; columnId: number}>('task/editTaskTitle');

export const editDescTitle = createAction<{description: string; index:number; columnId: number}>('task/editDescTitle');

export const deleteDescTitle = createAction<{index:number; columnId: number}>('task/deleteDescTitle');

export const addCommentToTask = createAction<{comment:string; index:number; columnId: number}>('task/addCommentToTask');
export const editCommentToTask = createAction<{comment:string; index:number; indexComment:number; columnId:number}>('task/editCommentToTask');
export const deleteCommentToTask = createAction<{index:number; indexComment:number; columnId:number}>('task/deleteCommentToTask');

export const deleteCard = createAction<{index:number; columnId: number}>('task/deleteCard');
