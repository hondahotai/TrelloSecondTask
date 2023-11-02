import "./Popup.css";
import {useDispatch} from "react-redux";
import {addName} from "../../state/ducks/userName/actions";
import {useForm} from "react-hook-form";
import {RootState} from "../../state/appState";

interface IPopup {
  active: boolean;
  onClose: () => void;
}

interface InputName {
  name: string
}

const Popup = ({ active, onClose }: IPopup) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm<InputName>();

  const onSubmit = (data:InputName) => {
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
