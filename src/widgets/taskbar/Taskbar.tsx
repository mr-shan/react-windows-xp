import { useSelector, useDispatch } from "react-redux";
import { createNewTask } from "../../store/slices/taskManager";

import StartButton from "../../components/Buttons/startButton/startButton";
import TaskbarAction from "../../components/taskbarAction/TaskbarAction";

import notepad from "./../../assets/logos/notepad.png";

import styles from "./Taskbar.module.css";

export default function Taskbar() {
  const dispatch = useDispatch();

  function openNotepad() {
    dispatch(
      createNewTask({
        name: "NOTEPAD",
      })
    );
  }

  const Icon = (
    <button onClick={openNotepad} className={styles.taskbarProgramLauncher}>
      <img src={notepad} />
    </button>
  );

  return (
    <div className={styles.container}>
      <StartButton />
      {Icon}
      <TaskbarAction />
    </div>
  );
}
