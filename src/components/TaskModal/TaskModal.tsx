import "./TaskModal.css";
import {useState} from "react";
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

  const [editingTaskTitle, setEditingTaskTitle] = useState(false);
  const [tempTaskTitle, setTempTaskTitle] = useState(columnTask.title);

  const updateTaskTitle = () => {
    dispatch(editTaskTitle({title:tempTaskTitle, index, columnId}));
    setEditingTaskTitle(false);
  }

  const columnTitle = useSelector((state:any) => state.column[columnId-1].title)

  const [descriptionIsEditing, setDescriptionIsEditing] = useState(false);
  const [tempDescTitle, setTempDescTitle] = useState(columnTask.description)

  const updateDescTitle = () => {
    dispatch(editDescTitle({description: tempDescTitle, index, columnId}))
    setDescriptionIsEditing(false);
  }

  const deleteDescription = () => {
    dispatch(deleteDescTitle({index, columnId}))
  }

  const comments = columnTask.comments;
  const [tempComments, setTempComments] = useState('');
  const [commentIsEditing, setCommentIsEditing] = useState(-1);
  const [editingComment, setEditingComment] = useState('');

  const addComment = () => {
    if (tempComments) {
      dispatch(addCommentToTask({comment: tempComments, index, columnId}));
      setTempComments('');
    }
  }
  const updateComment = () => {
    dispatch(editCommentToTask({comment:editingComment, index, indexComment:commentIsEditing, columnId}));
    setEditingComment('');
    setCommentIsEditing(-1);
  }
  const deleteComment = (idx:number) => {
    dispatch(deleteCommentToTask({index, indexComment:idx, columnId}));
    setEditingComment('');
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
            <>
              <input
                type="text"
                value={tempTaskTitle}
                onChange={(e) => {setTempTaskTitle(e.target.value)}}
              />
              <button onClick={updateTaskTitle}>Save</button>
              <button onClick={() => setEditingTaskTitle(false)}>Cancel</button>
            </>
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
            <>
              <input
                type="text"
                value={tempDescTitle}
                onChange={(e) => {setTempDescTitle(e.target.value)}}
              />
              <button onClick={updateDescTitle}>Save</button>
            </>
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
                  <>
                    <input
                      type="text"
                      value={editingComment}
                      onChange={(e) => setEditingComment(e.target.value)}
                    />
                    <button onClick={() => updateComment()}>Save</button>
                  </>
                ) : (
                  <>
                    {comment}
                    <button onClick={() => {setCommentIsEditing(idx);setEditingComment(comment)}}>Edit</button>
                    <button onClick={() => {deleteComment(idx)}}>Delete</button>
                  </>
                )}
              </li>
            ))}
          </ul>
          <input
            type="text"
            value={tempComments}
            onChange={(e) => {setTempComments(e.target.value)}}
            placeholder="Написать комментарий..."
          />
          <button onClick={addComment}>Add Comment</button>
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
