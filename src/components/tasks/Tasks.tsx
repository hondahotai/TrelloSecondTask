import "./Tasks.css";
import TaskModal from "../TaskModal/TaskModal";
import React, { useState, useEffect } from "react";

type TitleColumns = {
  title: string;
  columnId: number;
};

const Tasks = ({ columnId, title }: TitleColumns) => {
  const [tasks, setTasks] = useState<string[]>([]);
  const [newTask, setNewTask] = useState("");

  const [openedModalIndex, setOpenedModalIndex] = useState<number | null>(null);

  const [commentsCounts, setCommentsCounts] = useState<number[]>([]);
  const setCommentsCount = (index: number, count: number) => {
    const updatedCounts = [...commentsCounts];
    updatedCounts[index] = count;
    setCommentsCounts(updatedCounts);
  };

  const handleOpenModal = (index: number) => {
    setOpenedModalIndex(index);
  };

  const handleCloseModal = () => {
    setOpenedModalIndex(null);
  };

  const handleEscapeKey = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      handleCloseModal();
    }
  };

  useEffect(() => {
    if (openedModalIndex !== null) {
      document.addEventListener("keydown", handleEscapeKey);
    }
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [openedModalIndex]);

  function addLocalStorage(key: string, value: string) {
    const current: string[] = JSON.parse(localStorage.getItem(key) || "[]");

    current.push(value);
    localStorage.setItem(key, JSON.stringify(current));
  }

  useEffect(() => {
    const loadTasksFromLocalStorage = () => {
      const storedTasks = localStorage.getItem(`column-${columnId}`);
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }

      const loadedCommentsCounts = storedTasks
        ? JSON.parse(storedTasks).map((task: string, index: number) => {
            const storedComments = localStorage.getItem(
              `comments-${columnId}-${index}`,
            );
            return storedComments ? JSON.parse(storedComments).length : 0;
          })
        : [];

      setCommentsCounts(loadedCommentsCounts);
    };

    loadTasksFromLocalStorage();
  }, [columnId]);

  const addTask = () => {
    if (newTask) {
      setTasks([...tasks, newTask]);
      setNewTask("");
      addLocalStorage(`column-${columnId}`, newTask);
    }
  };

  const deleteTask = (index: number) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
    localStorage.setItem(`column-${columnId}`, JSON.stringify(updatedTasks));

    localStorage.removeItem(`description-${columnId}-${index}`);
    localStorage.removeItem(`comments-${columnId}-${index}`);

    for (let i = index + 1; i < tasks.length; i++) {
      const nextComments = localStorage.getItem(`comments-${columnId}-${i}`);
      localStorage.setItem(
        `comments-${columnId}-${i - 1}`,
        nextComments || "[]",
      );
      localStorage.removeItem(`comments-${columnId}-${i}`);

      for (let i = index + 1; i < tasks.length; i++) {
        const nextDescription = localStorage.getItem(
          `description-${columnId}-${i}`,
        );
        if (nextDescription) {
          localStorage.setItem(
            `description-${columnId}-${i - 1}`,
            nextDescription,
          );
          localStorage.removeItem(`description-${columnId}-${i}`);
        }
      }
    }

    const updatedCounts = [...commentsCounts];
    updatedCounts.splice(index, 1);
    setCommentsCounts(updatedCounts);
    handleCloseModal();
  };

  const updateTaskTitle = (index: number, newTitle: string) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = newTitle;
    setTasks(updatedTasks);
    localStorage.setItem(title, JSON.stringify(updatedTasks));
  };

  return (
    <div className="taskWrap">
      <ul className="tasksList">
        {tasks.map((task, index) => (
          <li
            onClick={() => {
              handleOpenModal(index);
            }}
            className="task"
            key={index}
          >
            {openedModalIndex === index && (
              <TaskModal
                task={task}
                index={index}
                title={title}
                deleteTask={deleteTask}
                setCommentsCount={setCommentsCount}
                updateTaskTitle={updateTaskTitle}
                columnId={columnId}
                handleCloseModal={handleCloseModal}
              />
            )}
            {task}
            <div className="comments">
              <img src="../chatICon.png" alt="chatICon" />
              <p className="commentsCounts">{commentsCounts[index] || 0}</p>
            </div>
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button onClick={addTask}>Add Task</button>
    </div>
  );
};

export default Tasks;
