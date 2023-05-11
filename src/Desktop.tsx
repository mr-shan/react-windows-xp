import { useSelector, useDispatch } from "react-redux";
import { setWindowInFocus } from "./store/slices/taskManager";

import "./Desktop.css";

import Taskbar from "./widgets/taskbar/Taskbar";
import Notepad from "./programs/notepad/Notepad";

function Desktop() {
  const dispatch = useDispatch();
  const runningTasks = useSelector((state) => state.taskManager.runningTasks);

  const setFocus = () => {
    dispatch(setWindowInFocus(0));
  };

  return (
    <div className="desktop-container">
      <div className="desktop-area" onMouseDown={setFocus}>
        {runningTasks.map((task) => {
          const Component = task.component;
          return <Notepad config={task} key={task.id} />;
        })}
      </div>
      <Taskbar onMouseDown={setFocus}/>
    </div>
  );
}

export default Desktop;
