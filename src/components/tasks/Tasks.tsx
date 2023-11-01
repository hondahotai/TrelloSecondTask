import "./Tasks.css";
import TaskModal from "../TaskModal/TaskModal";
import {useDispatch, useSelector} from "react-redux";
import {addTask} from "../../state/ducks/tasks/actions";
import {useState} from "react";
import {Task} from "../../state/ducks/tasks/types";
import {useEffect} from "react";

type TitleColumns = {
  columnId: number;
};

const Tasks = ({ columnId}: TitleColumns) => {

  const [task, setTask] = useState('');

  const dispatch = useDispatch();
  const columnTasks = useSelector((state:any) => state.task.taskByColumn[columnId]);
  const [openedModalIndex, setOpenedModalIndex] = useState<null | number>();


 const addNewTask = () => {
   if (task) {
     dispatch(addTask({columnId, task}));
     setTask('');
   }
 }




  const handleCloseModal = () => {
    setOpenedModalIndex(null);
  };

  const handleOpenModal = (index: number) => {
    setOpenedModalIndex(index);
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
  }, [handleEscapeKey, openedModalIndex]);


  return (
    <div className="taskWrap">
      <ul className="tasksList">
        {columnTasks.map((task:Task, index:number) => (
          <li
            onClick={() => {
              handleOpenModal(index)
            }}
            className="task"
            key={index}
          >
            {openedModalIndex === index && (
              <TaskModal
                index={index}
                columnId={columnId}
                handleCloseModal={handleCloseModal}
              />
            )}
            {task.title}
            <div className="comments">
              <img src="../chatICon.png" alt="chatICon" />
              <p className="commentsCounts">{columnTasks[index].commentsCount}</p>
            </div>
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={task}
        onChange={(e) => {setTask(e.target.value)}}
      />
      <button onClick={addNewTask}>Add Task</button>
    </div>
  );
};

export default Tasks;
