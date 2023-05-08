import { useSelector, useDispatch } from "react-redux";
import { createNewTask } from "../../../store/slices/taskManager";

import StartButton from "./../../Buttons/startButton/startButton";
import TaskbarAction from "../../taskbarAction/TaskbarAction";

import styles from "./Taskbar.module.css";

export default function Taskbar() {
  const tasks = useSelector(state => state.taskManager.runningTasks);
  const dispatch = useDispatch()

  function startButtonClickHandler() {
    dispatch(createNewTask({
      id: Math.random(),
      name: 'Notepad',
      program: 'Notepad'
    }))
  }

  return (
    <div className={styles.container}>
      <StartButton onClick={startButtonClickHandler}/>
      <TaskbarAction />
    </div>
  );
}
