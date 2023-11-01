import "./Columns.css";
import Tasks from "../tasks/Tasks";
import { useDispatch, useSelector } from "react-redux";
import { ColumnData } from "../../state/ducks/columns/types";
import { setTitle, toggleEditing } from "../../state/ducks/columns/actions";

interface ColumnProps {
  index: number;
}

const Column = ({ index }: ColumnProps) => {
  const dispatch = useDispatch();

  const column = useSelector((state: any) =>
      state.column.find((col: ColumnData) => col.id === index),
  );
  const storedTitle = localStorage.getItem(`column-title-${column.id}`);
  const currentTitle = column.currentTitle || storedTitle || column.title;

  const handleTitleChange = (e: any) => {
    const newTitle = e.target.value;
    dispatch(setTitle({ id: index, title: newTitle }));

    localStorage.setItem(`column-title-${column.id}`, newTitle);
  };

  return (
      <div className="column">
        {column.isEditing ? (
            <div className="wrapper">
              <input
                  className="inputHeader"
                  type="text"
                  value={currentTitle}
                  onChange={handleTitleChange}
                  onBlur={() => dispatch(toggleEditing(index))}
              />
            </div>
        ) : (
            <div className="wrapper">
              <h1 className="title" onClick={() => dispatch(toggleEditing(index))}>
                {currentTitle}
              </h1>
            </div>
        )}
        <Tasks columnId={column.id}/>
      </div>
  );
};

export default Column;

