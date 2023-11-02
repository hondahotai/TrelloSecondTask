import { createReducer } from '@reduxjs/toolkit';
import {TaskData, Task} from "./types";
import {
    modalIsOpen,
    addTask,
    editTaskTitle,
    editDescTitle,
    deleteDescTitle,
    addCommentToTask,
    editCommentToTask,
    deleteCommentToTask,
    deleteCard,
} from './actions';

const initialState:TaskData = {
    taskByColumn: {
        1: [],
        2: [],
        3: [],
        4: [],
    },
};

const taskReducer = createReducer(initialState, builder => {
    builder
        .addCase(addTask,(state, action) => {
            const {columnId, task} = action.payload;
            const newTask: Task = {
                id: state.taskByColumn[columnId].length + 1,
                title: task,
                description: '',
                comments: [],
                commentsCount: 0
            }
                state.taskByColumn[columnId].push(newTask);
        })
        .addCase(editTaskTitle, (state, action) => {
            const {title, index, columnId} = action.payload;
            state.taskByColumn[columnId][index].title = title;
        })
        .addCase(editDescTitle, (state, action) => {
            const {description, index, columnId} = action.payload;
            state.taskByColumn[columnId][index].description = description;
        })
        .addCase(deleteDescTitle, (state, action) => {
            const {index, columnId} = action.payload;
            state.taskByColumn[columnId][index].description = ' ';
        })
        .addCase(addCommentToTask, (state, action) => {
            const {comment, index, columnId} = action.payload;
            state.taskByColumn[columnId][index].comments.push(comment);
            state.taskByColumn[columnId][index].commentsCount++;
        })
        .addCase(editCommentToTask, (state, action) => {
            const {comment, indexComment, index, columnId} = action.payload;
            state.taskByColumn[columnId][index].comments[indexComment] = comment;
        })
        .addCase(deleteCommentToTask, (state, action) => {
            const {indexComment, index, columnId} = action.payload;
            state.taskByColumn[columnId][index].comments.splice(indexComment, 1);
            state.taskByColumn[columnId][index].commentsCount--;
        })
        .addCase(deleteCard, (state, action) => {
            const {index, columnId} = action.payload;
            state.taskByColumn[columnId].splice(index, 1);
        })


});

export default taskReducer;
