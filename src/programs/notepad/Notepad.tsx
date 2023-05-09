import { useDispatch } from "react-redux";
import { closeTask } from "@/store/slices/taskManager";
import Window from "@/widgets/window/Window";
import styles from "./Notepad.module.css";

export default function Notepad(props) {
  const dispatch = useDispatch();

  function closeProgram() {
    dispatch(closeTask(props.config.id))
  }

  return (
    <Window programInfo={props.config} onClose={closeProgram}>
      <textarea className={styles.textarea}></textarea>
    </Window>
  );
}
