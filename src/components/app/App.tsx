import "./App.css";
import Board from "../board/Board";
import Popup from "../popup/Popup";
import { useEffect, useState } from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../state/appState";

const App = () => {
  const checkNameInStorage = useSelector((state:RootState) => state.userName.name);

  const [popupActive, setPopupActive] = useState<boolean>(!checkNameInStorage);


  useEffect(() => {
    if (checkNameInStorage) {
      setPopupActive(false);
    } else {
      setPopupActive(true);
    }
  }, [checkNameInStorage]);

  const closePopup = () => {
    setPopupActive(false);
  };

  return (
    <div>
      <Board />
      <Popup active={popupActive} onClose={closePopup} />
    </div>
  );
};
export default App;
