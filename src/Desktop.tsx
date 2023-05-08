import { useSelector, useDispatch } from "react-redux";
import { setWindowInFocus } from "./store/slices/windowManagement";

import "./Desktop.css";

import Taskbar from "./components/widgets/taskbar/Taskbar";
import Window from "./components/widgets/window/Window";

function Desktop() {
  const dispatch = useDispatch();

  const setFocus = () => {
    dispatch(setWindowInFocus(0));
  };

  return (
    <div className="desktop-container" onMouseDown={setFocus}>
      <Window id="1" />
      <Window id="2" />
      <Taskbar />
    </div>
  );
}

export default Desktop;
