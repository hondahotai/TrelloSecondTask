import "./App.css";
import Board from "../board/Board";
import Popup from "../popup/Popup";
import { useEffect, useState } from "react";

const App = () => {
  const [popupActive, setPopupActive] = useState<boolean>(
    !localStorage.getItem("name"),
  );

  useEffect(() => {
    const checkNameInStorage = localStorage.getItem("name");
    if (checkNameInStorage) {
      setPopupActive(false);
    } else {
      setPopupActive(true);
    }
  }, []);

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
