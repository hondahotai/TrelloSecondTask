import "./Tasks.css";
import TaskModal from "../TaskModal/TaskModal";
import {useDispatch, useSelector} from "react-redux";
import {addTask} from "../../state/ducks/tasks/actions";
import {useState} from "react";
import {Task} from "../../state/ducks/tasks/types";
import {useEffect} from "react";
import { useForm } from 'react-hook-form';

type TitleColumns = {
  columnId: number;
};

const Tasks = ({ columnId}: TitleColumns) => {

  const dispatch = useDispatch();
  const columnTasks = useSelector((state:any) => state.task.taskByColumn[columnId]);
  const [openedModalIndex, setOpenedModalIndex] = useState<null | number>();

    const { register, handleSubmit, reset, formState: { errors } } = useForm();


    const onSubmit = (data:any):void => {
        if (data.taskTitle) {
            dispatch(addTask({ columnId, task: data.taskTitle }));
            reset({taskTitle: ''});
        }
    };



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
        <form onSubmit={handleSubmit(onSubmit)}>
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
                {...register('taskTitle', {required:true})}
            />
            <button type="submit">Add Task</button>
        </form>
    </div>
  );
};

export default Tasks;
