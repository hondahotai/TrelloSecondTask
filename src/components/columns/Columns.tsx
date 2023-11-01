import "./Columns.css";
import Tasks from "../tasks/Tasks";
import { useDispatch, useSelector } from "react-redux";
import { ColumnData } from "../../state/ducks/columns/types";
import { setTitle, toggleEditing } from "../../state/ducks/columns/actions";
import {useForm} from "react-hook-form";

interface ColumnProps {
  index: number;
}

const Column = ({ index }: ColumnProps) => {
  const dispatch = useDispatch();


  const column = useSelector((state: any) =>
      state.column.find((col: ColumnData) => col.id === index),
  );

  const currentTitle = column.currentTitle  || column.title;


  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      title: currentTitle
    }
  });

  const onSubmit = (data: {title:string}) => {
    dispatch(setTitle({ id: index, title: data.title }));
    dispatch(toggleEditing(index));
  };

  return (
      <div className="column">
        {column.isEditing ? (
            <div className="wrapper">
              <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    className="inputHeader"
                    {...register("title", { required: true })}
                    onBlur={handleSubmit(onSubmit)}
                />
                {errors.title && <p>поле обязательно</p>}
              </form>
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

