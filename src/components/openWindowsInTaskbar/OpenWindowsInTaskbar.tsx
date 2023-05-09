import { useSelector, useDispatch } from "react-redux";
import { setWindowInFocus } from "@/store/slices/windowManagement";

import styles from "./OpenWindowsInTaskbar.module.css";

export default function OpenWindowsInTaskbar(props) {
  const dispatch = useDispatch();
  const runningTasks = useSelector((state) => state.taskManager.runningTasks);
  const activeWindow = useSelector(
    (state) => state.windowManagement.windowInFocus
  );

  return (
    <div className={styles.container}>
      {runningTasks.map((task) => {
        return (
          <div
            className={`${styles.taskWrapper} ${
              activeWindow == task.id ? styles.active : ""
            }`}
            key={task.id}
            onClick={() => dispatch(setWindowInFocus(task.id))}
          >
            <img src={task.icon} />
            <span>{task.name}</span>
          </div>
        );
      })}
    </div>
  );
}
