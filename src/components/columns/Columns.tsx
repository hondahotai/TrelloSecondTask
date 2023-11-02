import "./Columns.css";
import Tasks from "../tasks/Tasks";
import { useDispatch, useSelector } from "react-redux";
import { ColumnData } from "../../state/ducks/columns/types";
import { setTitle, toggleEditing } from "../../state/ducks/columns/actions";
import {useForm} from "react-hook-form";
import {RootState} from "../../state/appState";
import {useState, useEffect} from "react";

interface ColumnProps {
  index: number;
}


interface InputTitle {
  title:string
}

const Column = ({ index }: ColumnProps) => {
  const dispatch = useDispatch();


  const column = useSelector((state: RootState) =>
      state.column.find((col: ColumnData) => col.id === index),
  );


  const [initialValues, setInitialValues] = useState({ title: '' });



  const { register, handleSubmit, reset, formState: { errors } } = useForm<InputTitle>({
    defaultValues: {
      title: initialValues.title
    }
  });

  useEffect(() => {
    if (column) {
      const newInitialValues = { title: column.currentTitle || column.title };
      setInitialValues(newInitialValues);
      reset(newInitialValues);
    }
  }, [column, reset]);

  if (!column) {
    return null;
  }

  const currentTitle = column.currentTitle || column.title;

  const onSubmit = (data:InputTitle) => {
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

