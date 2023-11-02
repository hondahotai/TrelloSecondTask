import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task, TaskData } from "./types";

const initialState: TaskData = {
  taskByColumn: {
    1: [],
    2: [],
    3: [],
    4: [],
  },
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    addTask(state, action: PayloadAction<{ columnId: number; task: string }>) {
      const { columnId, task } = action.payload;
      const newTask: Task = {
        id: state.taskByColumn[columnId].length + 1,
        title: task,
        description: "",
        comments: [],
        commentsCount: 0,
      };
      state.taskByColumn[columnId].push(newTask);
    },
    editTaskTitle(
      state,
      action: PayloadAction<{ title: string; index: number; columnId: number }>,
    ) {
      const { title, index, columnId } = action.payload;
      state.taskByColumn[columnId][index].title = title;
    },
    editDescTitle(
      state,
      action: PayloadAction<{
        description: string;
        index: number;
        columnId: number;
      }>,
    ) {
      const { description, index, columnId } = action.payload;
      state.taskByColumn[columnId][index].description = description;
    },
    deleteDescTitle(
      state,
      action: PayloadAction<{ index: number; columnId: number }>,
    ) {
      const { index, columnId } = action.payload;
      state.taskByColumn[columnId][index].description = " ";
    },
    addCommentToTask(
      state,
      action: PayloadAction<{
        comment: string;
        index: number;
        columnId: number;
      }>,
    ) {
      const { comment, index, columnId } = action.payload;
      state.taskByColumn[columnId][index].comments.push(comment);
      state.taskByColumn[columnId][index].commentsCount++;
    },
    editCommentToTask(
      state,
      action: PayloadAction<{
        comment: string;
        index: number;
        indexComment: number;
        columnId: number;
      }>,
    ) {
      const { comment, indexComment, index, columnId } = action.payload;
      state.taskByColumn[columnId][index].comments[indexComment] = comment;
    },
    deleteCommentToTask(
      state,
      action: PayloadAction<{
        index: number;
        indexComment: number;
        columnId: number;
      }>,
    ) {
      const { indexComment, index, columnId } = action.payload;
      state.taskByColumn[columnId][index].comments.splice(indexComment, 1);
      state.taskByColumn[columnId][index].commentsCount--;
    },
    deleteCard(
      state,
      action: PayloadAction<{ index: number; columnId: number }>,
    ) {
      const { index, columnId } = action.payload;
      state.taskByColumn[columnId].splice(index, 1);
    },
  },
});

export const {
  addTask,
  editTaskTitle,
  editDescTitle,
  deleteDescTitle,
  addCommentToTask,
  editCommentToTask,
  deleteCommentToTask,
  deleteCard,
} = taskSlice.actions;
export default taskSlice;
