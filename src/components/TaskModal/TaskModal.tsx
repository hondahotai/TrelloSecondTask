import React, { useState, useEffect } from "react";
import "./TaskModal.css";

type TaskModalProps = {
  task: string;
  index: number;
  title: string;
  deleteTask: (index: number) => void;
  setCommentsCount: (index: number, count: number) => void;
  updateTaskTitle: (index: number, newTitle: string) => void;
  columnId: number;
  handleCloseModal: () => void;
};

const TaskModal = ({
  task,
  index,
  title,
  deleteTask,
  setCommentsCount,
  updateTaskTitle,
  columnId,
  handleCloseModal,
}: TaskModalProps) => {
  const taskFromStorage = localStorage.getItem(`column-${columnId}`);
  const tasksArray = taskFromStorage ? JSON.parse(taskFromStorage) : [];
  const taskIndex = tasksArray[index];

  const [editingTaskTitle, setEditingTaskTitle] = useState<boolean>(false);
  const [tempTaskTitle, setTempTaskTitle] = useState<string>(task);

  const handleTaskTitleChange = (e: any) => {
    setTempTaskTitle(e.target.value);
  };

  const saveTaskTitleToLocalStorage = () => {
    const updatedTasks = [...tasksArray];
    updatedTasks[index] = tempTaskTitle;
    localStorage.setItem(`column-${columnId}`, JSON.stringify(updatedTasks));
    updateTaskTitle(index, tempTaskTitle);
    setEditingTaskTitle(false);
  };

  const handleEditTaskTitle = () => {
    setTempTaskTitle(task);
    setEditingTaskTitle(true);
  };

  const [description, setDescription] = useState<string>(() => {
    const descFromStorage = localStorage.getItem(
      `description-${columnId}-${index}`,
    );
    return descFromStorage || "";
  });

  const [editing, setEditing] = useState(false);
  const [tempDescription, setTempDescription] = useState("");

  const handleDescriptionChange = (e: any) => {
    setTempDescription(e.target.value);
  };

  const saveDescriptionToLocalStorage = () => {
    setDescription(tempDescription);
    localStorage.setItem(`description-${columnId}-${index}`, tempDescription);
    setEditing(false);
  };

  const handleEditDescription = () => {
    setTempDescription(description);
    setEditing(true);
  };

  const handleDeleteDescription = () => {
    setDescription("");
    localStorage.removeItem(`description-${columnId}-${index}`);
  };

  const checkComments = (): string[] => {
    const storedComments = localStorage.getItem(
      `comments-${columnId}-${index}`,
    );
    return storedComments ? JSON.parse(storedComments) : [];
  };
  const [comments, setComments] = useState<string[]>(checkComments);

  const [editingCommentIndex, setEditingCommentIndex] = useState<number | null>(
    null,
  );
  const [tempComment, setTempComment] = useState<string>("");

  const handleCommentChange = (e: any) => {
    setTempComment(e.target.value);
  };

  const addComment = () => {
    if (tempComment.trim() !== "") {
      setComments([...comments, tempComment]);
      setTempComment("");
    }
  };

  const editComment = (idx: number) => {
    setEditingCommentIndex(idx);
    setTempEditedComment(comments[idx]);
  };

  const saveEditedComment = () => {
    const updatedComments = [...comments];
    updatedComments[editingCommentIndex!] = tempEditedComment;
    setComments(updatedComments);
    setEditingCommentIndex(null);
    setTempEditedComment("");
  };

  const deleteComment = (idx: number) => {
    const updatedComments = [...comments];
    updatedComments.splice(idx, 1);
    setComments(updatedComments);
  };

  useEffect(() => {
    localStorage.setItem(
      `comments-${columnId}-${index}`,
      JSON.stringify(comments),
    );
  }, [comments]);

  useEffect(() => {
    setCommentsCount(index, comments.length);
    localStorage.setItem(
      `comments-${columnId}-${index}`,
      JSON.stringify(comments),
    );
  }, [comments, columnId, index]);

  const [tempEditedComment, setTempEditedComment] = useState<string>("");

  return (
    <div className="TaskModal">
      <div className="TaskModalContent">
        <h1>
          {" "}
          {editingTaskTitle ? (
            <>
              <input
                type="text"
                value={tempTaskTitle}
                onChange={handleTaskTitleChange}
              />
              <button onClick={saveTaskTitleToLocalStorage}>Save</button>
              <button onClick={() => setEditingTaskTitle(false)}>Cancel</button>
            </>
          ) : (
            <>
              {taskIndex}
              <button onClick={handleEditTaskTitle}>Edit</button>
            </>
          )}
        </h1>
        <div className="ColumnName">в колонке: {title}</div>
        <div>автор:{localStorage.getItem("name")}</div>
        <div className="description">
          Описание:
          {editing ? (
            <>
              <input
                type="text"
                value={tempDescription}
                onChange={handleDescriptionChange}
              />
              <button onClick={saveDescriptionToLocalStorage}>Save</button>
            </>
          ) : (
            <>
              <span>{description}</span>
              <button onClick={handleEditDescription}>Edit</button>
              <button onClick={handleDeleteDescription}>Delete</button>
            </>
          )}
        </div>
        <div className="CommentTasks">
          Комментарии:
          <ul>
            {comments.map((comment, idx) => (
              <li key={idx}>
                {editingCommentIndex === idx ? (
                  <>
                    <input
                      type="text"
                      value={tempEditedComment}
                      onChange={(e) => setTempEditedComment(e.target.value)}
                    />
                    <button onClick={saveEditedComment}>Save</button>
                  </>
                ) : (
                  <>
                    {`${localStorage.getItem("name")}: ${comment}`}
                    <button onClick={() => editComment(idx)}>Edit</button>
                    <button onClick={() => deleteComment(idx)}>Delete</button>
                  </>
                )}
              </li>
            ))}
          </ul>
          <input
            type="text"
            value={tempComment}
            onChange={handleCommentChange}
            placeholder="Написать комментарий..."
          />
          <button onClick={addComment}>Add Comment</button>
        </div>
        <button
          onClick={(e) => {
            deleteTask(index);
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
