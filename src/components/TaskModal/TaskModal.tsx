import "./TaskModal.css";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {
  addCommentToTask, deleteCard, deleteCommentToTask,
  deleteDescTitle,
  editCommentToTask,
  editDescTitle,
  editTaskTitle,
} from "../../state/ducks/tasks/actions";

type TaskModalProps = {
  index: number;
  columnId: number;
  handleCloseModal: () => void;

};

const TaskModal = ({ index, columnId, handleCloseModal}: TaskModalProps) => {
  const dispatch = useDispatch();
  const columnTask = useSelector((state:any) => state.task.taskByColumn[columnId][index]);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      taskTitle: columnTask.title
    }
  });

  const [editingTaskTitle, setEditingTaskTitle] = useState(false);

  const onSubmit = (data:any) => {
    dispatch(editTaskTitle({ title: data.taskTitle, index, columnId }));
    setEditingTaskTitle(false);
  };


  const columnTitle = useSelector((state:any) => state.column[columnId-1].title)

  const [descriptionIsEditing, setDescriptionIsEditing] = useState(false);
  const [tempDescTitle, setTempDescTitle] = useState(columnTask.description)

  const {register: registerDescription, handleSubmit:handleSubmitDescription} = useForm({
    defaultValues: {
      description: columnTask.description
    }
  })

  const updateDescTitle = (data:any) => {
    dispatch(editDescTitle({description: data.description, index, columnId}))
    setDescriptionIsEditing(false);
  }

  const deleteDescription = () => {
    dispatch(deleteDescTitle({index, columnId}))
  }

  const comments = columnTask.comments;
  const [commentIsEditing, setCommentIsEditing] = useState(-1);

  const {register: registerCommentValue, handleSubmit:handleSubmitCommentValue} = useForm();
  const {register: registerNewComment, handleSubmit:handleSubmitNewComment, reset:resetNewCommentInput} = useForm();

  const addComment = (data:any) => {
    if (data) {
      dispatch(addCommentToTask({comment: data.value, index, columnId}));
      resetNewCommentInput();
    }
  }
  const updateComment = (data:any) => {
    dispatch(editCommentToTask({comment: data.comment, index, indexComment:commentIsEditing, columnId}));
    setCommentIsEditing(-1);
  }
  const deleteComment = (idx:number) => {
    dispatch(deleteCommentToTask({index, indexComment:idx, columnId}));
    setCommentIsEditing(-1);
  }

  const handleDeleteCard = () => {
    handleCloseModal();
    dispatch(deleteCard({index, columnId}))
  }


  return (
    <div className="TaskModal">
      <div className="TaskModalContent">
        <h1>
          {" "}
          {editingTaskTitle ?  (
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                type="text"
                {...register('taskTitle', {required:true})}
              />
              <button type='submit'>Save</button>
              <button type='button' onClick={() => { setEditingTaskTitle(false);reset({taskTitle: columnTask.title})}}>Cancel</button>
            </form>
          ) : (
            <>
              {columnTask.title}
              <button  onClick={() => setEditingTaskTitle(true)}>Edit</button>
            </>
          )}
        </h1>
        <div className="ColumnName">в колонке: {columnTitle}</div>
        <div>автор:{useSelector((state:any) => state.userName.name)}</div>
        <div className="description">
          Описание:
          {descriptionIsEditing ?  (
            <form onSubmit={handleSubmitDescription(updateDescTitle)}>
              <input
                type="text"
                {...registerDescription('description', {required: true})}
              />
              <button type='submit'>Save</button>
            </form>
          ) : (
            <>
              <span>{columnTask.description}</span>
              <button onClick={() => setDescriptionIsEditing(true)}>Edit</button>
              <button onClick={deleteDescription}>Delete</button>
            </>
          )}
        </div>
        <div className="CommentTasks">
          Комментарии:
          <ul>
            {comments.map((comment:string, idx:number) => (
              <li key={idx}>
                {commentIsEditing === idx ? (
                  <form onSubmit={handleSubmitCommentValue(updateComment)}>
                    <input
                      type="text"
                      defaultValue={comment}
                      {...registerCommentValue('comment', {required:true})}
                    />
                    <button type='submit'>Save</button>
                  </form>
                ) : (
                  <>
                    {comment}
                    <button onClick={() => {setCommentIsEditing(idx)}}>Edit</button>
                    <button onClick={() => {deleteComment(idx)}}>Delete</button>
                  </>
                )}
              </li>
            ))}
          </ul>
          <form onSubmit={handleSubmitNewComment(addComment)}>
            <input
                type="text"
                {...registerNewComment('value', {required:true})}
                placeholder="Написать комментарий..."
            />
            <button type='submit'>Add Comment</button>
          </form>
        </div>
        <button
onClick={(e) => {handleDeleteCard(); handleCloseModal(); e.stopPropagation();}}
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
