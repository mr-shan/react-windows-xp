import { useDispatch } from "react-redux";
import { closeTask } from "@/store/slices/taskManager";
import Window from "@/widgets/window/Window";
import error from "@/assets/logos/error.png"
import styles from "./Error.module.css";
import { useEffect } from "react";

export default function Notepad(props) {
  const dispatch = useDispatch();

  function closeProgram() {
    dispatch(closeTask(props.config.id))
  }

  useEffect(() => {
  }, [props])

  return (
    <Window programInfo={props.config} onClose={closeProgram}>
      <div className={styles.errorContainer}>
        <div className={styles.body}>
            <img src={error}/>
            <p>
                The task has failed successfully. You can check the logs.

            </p>
        </div>
        <footer className={styles.footer}>
            <button className={styles.actionButton}>OK</button>
        </footer>
      </div>
    </Window>
  );
}
