import "./Popup.css";
import {useDispatch} from "react-redux";
import {addName} from "../../state/ducks/userName/actions";
import {useForm} from "react-hook-form";

interface IPopup {
  active: boolean;
  onClose: () => void;
}

const Popup = ({ active, onClose }: IPopup) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data:any) => {
    dispatch(addName(data.name))
    onClose();
  };

  return (
    <div className={`Popup ${active ? "PopupActive" : ""}`}>
      <div className="PopupContent">
        <form onSubmit={handleSubmit(onSubmit)}>
          Введите имя:
          <input
              className="PopupInput"
              {...register("name", {required: true})}
          />
          <button type='submit' className="PopupBtn">
            Сохранить
          </button>
        </form>
      </div>
    </div>
  );
};

export default Popup;
