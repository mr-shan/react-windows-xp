import { useSelector, useDispatch } from "react-redux";
import { setWindowInFocus, setWindowState } from "@/store/slices/taskManager";
import { WINDOW_STATES } from "../../constants/windowStates";

import styles from "./OpenWindowsInTaskbar.module.css";

export default function OpenWindowsInTaskbar(props) {
  const dispatch = useDispatch();

  const runningTasks = useSelector((state) => state.taskManager.runningTasks);
  const activeWindow = useSelector((state) => state.taskManager.windowInFocus);

  const onClickTaskHandler = (event, task) => {
    // console.log(activeWindow) TODO minimize the window when clicked and is active.
    if (activeWindow === task.id && task.windowState !== WINDOW_STATES.MINIMISED) {
      dispatch(setWindowState({ state: WINDOW_STATES.MINIMISED, id: task.id }));
      return;
    }
    dispatch(setWindowInFocus(task.id));
  };

  return (
    <div className={styles.container}>
      {runningTasks.map((task) => {
        return (
          <div
            className={`${styles.taskWrapper} ${
              activeWindow == task.id ? styles.active : ""
            }`}
            key={task.id}
            onClick={(event) => onClickTaskHandler(event, task)}
          >
            <img src={task.icon} />
            <span>{task.name}</span>
          </div>
        );
      })}
    </div>
  );
}
