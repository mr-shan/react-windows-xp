import { useSelector, useDispatch } from "react-redux";
import { setWindowInFocus } from "./store/slices/windowManagement";

import "./Desktop.css";

import Taskbar from "./widgets/taskbar/Taskbar";
import Notepad from "./programs/notepad/Notepad";

function Desktop() {
  const dispatch = useDispatch();
  const runningTasks = useSelector(state => state.taskManager.runningTasks);

  const setFocus = () => {
    dispatch(setWindowInFocus(0));
  };

  return (
    <div className="desktop-container" onMouseDown={setFocus}>
      {runningTasks.map(task => {
        const Component = task.component;
        return <Notepad config={task} key={task.id}/>
      })}
      <Taskbar />
    </div>
  );
}

export default Desktop;
