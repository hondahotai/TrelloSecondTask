import "./App.css";
import Board from "../board/Board";
import Popup from "../popup/Popup";
import { useEffect, useState } from "react";
import {useSelector} from "react-redux";

const App = () => {
  const [popupActive, setPopupActive] = useState<boolean>(
      !useSelector((state:any) => state.userName.name,
  ));


  const checkNameInStorage = useSelector((state:any) => state.userName.name);
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
