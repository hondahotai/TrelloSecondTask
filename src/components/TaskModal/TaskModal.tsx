import "./TaskModal.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  addCommentToTask,
  deleteCommentToTask,
  editCommentToTask,
  editTaskTitle,
  editDescTitle,
  deleteDescTitle,
  deleteCard,
} from "../../state/ducks/tasks/slice";
import { RootState } from "../../state/appState";

type TaskModalProps = {
  index: number;
  columnId: number;
  handleCloseModal: () => void;
};

interface InputForm {
  taskTitle: string;
  description: string;
  value: string;
  comment: string;
}

const TaskModal = ({ index, columnId, handleCloseModal }: TaskModalProps) => {
  const dispatch = useDispatch();
  const columnTask = useSelector(
    (state: RootState) => state.task.taskByColumn[columnId][index],
  );

  const { register, handleSubmit, reset } = useForm<InputForm>({
    defaultValues: {
      taskTitle: columnTask.title,
    },
  });

  const [editingTaskTitle, setEditingTaskTitle] = useState(false);

  const onSubmit = (data: InputForm) => {
    dispatch(editTaskTitle({ title: data.taskTitle, index, columnId }));
    setEditingTaskTitle(false);
  };

  const columnTitle = useSelector(
    (state: RootState) => state.column[columnId - 1].title,
  );

  const [descriptionIsEditing, setDescriptionIsEditing] = useState(false);

  const {
    register: registerDescription,
    handleSubmit: handleSubmitDescription,
  } = useForm<InputForm>({
    defaultValues: {
      description: columnTask.description,
    },
  });

  const updateDescTitle = (data: InputForm) => {
    dispatch(editDescTitle({ description: data.description, index, columnId }));
    setDescriptionIsEditing(false);
  };

  const deleteDescription = () => {
    dispatch(deleteDescTitle({ index, columnId }));
  };

  const comments = columnTask.comments;
  const [commentIsEditing, setCommentIsEditing] = useState(-1);

  const {
    register: registerCommentValue,
    handleSubmit: handleSubmitCommentValue,
    reset: resetCommentValue,
  } = useForm<InputForm>();
  const {
    register: registerNewComment,
    handleSubmit: handleSubmitNewComment,
    reset: resetNewCommentInput,
  } = useForm<InputForm>();

  const addComment = (data: InputForm) => {
    if (data) {
      dispatch(addCommentToTask({ comment: data.value, index, columnId }));
      resetNewCommentInput();
    }
  };
  const updateComment = (data: InputForm) => {
    dispatch(
      editCommentToTask({
        comment: data.comment,
        index,
        indexComment: commentIsEditing,
        columnId,
      }),
    );
    setCommentIsEditing(-1);
  };
  const deleteComment = (idx: number) => {
    dispatch(deleteCommentToTask({ index, indexComment: idx, columnId }));
    setCommentIsEditing(-1);
  };

  const handleDeleteCard = () => {
    handleCloseModal();
    dispatch(deleteCard({ index, columnId }));
  };

  const startEditComment = (idx: number, comment: string) => {
    setCommentIsEditing(idx);

    resetCommentValue({ comment: comment });
  };

  const cancelEditingTaskTitle = () => {
    setEditingTaskTitle(false);
    reset({ taskTitle: columnTask.title });
  };

  return (
    <div className="TaskModal">
      <div className="TaskModalContent">
        <h1>
          {" "}
          {editingTaskTitle ? (
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                type="text"
                {...register("taskTitle", { required: true })}
              />
              <button type="submit">Save</button>
              <button type="button" onClick={cancelEditingTaskTitle}>
                Cancel
              </button>
            </form>
          ) : (
            <>
              {columnTask.title}
              <button onClick={() => setEditingTaskTitle(true)}>Edit</button>
            </>
          )}
        </h1>
        <div className="ColumnName">в колонке: {columnTitle}</div>
        <div>
          автор:{useSelector((state: RootState) => state.userName.name)}
        </div>
        <div className="description">
          Описание:
          {descriptionIsEditing ? (
            <form onSubmit={handleSubmitDescription(updateDescTitle)}>
              <input
                type="text"
                {...registerDescription("description", { required: true })}
              />
              <button type="submit">Save</button>
            </form>
          ) : (
            <>
              <span>{columnTask.description}</span>
              <button onClick={() => setDescriptionIsEditing(true)}>
                Edit
              </button>
              <button onClick={deleteDescription}>Delete</button>
            </>
          )}
        </div>
        <div className="CommentTasks">
          Комментарии:
          <ul>
            {comments.map((comment: string, idx: number) => (
              <li key={idx}>
                {commentIsEditing === idx ? (
                  <form onSubmit={handleSubmitCommentValue(updateComment)}>
                    <input
                      type="text"
                      // defaultValue={comment}
                      {...registerCommentValue("comment", { required: true })}
                    />
                    <button type="submit">Save</button>
                  </form>
                ) : (
                  <>
                    {comment}
                    <button
                      onClick={() => {
                        startEditComment(idx, comment);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        deleteComment(idx);
                      }}
                    >
                      Delete
                    </button>
                  </>
                )}
              </li>
            ))}
          </ul>
          <form onSubmit={handleSubmitNewComment(addComment)}>
            <input
              type="text"
              {...registerNewComment("value", { required: true })}
              placeholder="Написать комментарий..."
            />
            <button type="submit">Add Comment</button>
          </form>
        </div>
        <button
          onClick={(e) => {
            handleDeleteCard();
            handleCloseModal();
            e.stopPropagation();
          }}
        >
          delete card
        </button>
        <button
          className="closeModalButton"
          onClick={(e) => {
            handleCloseModal();
            e.stopPropagation();
          }}
        >
          X
        </button>
      </div>
    </div>
  );
};

export default TaskModal;
