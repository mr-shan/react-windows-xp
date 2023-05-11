import { useState, useEffect } from "react";
import styles from "./Titlebar.module.css";
import CloseButton from "../Buttons/closeButton/CloseButton";
import MaximizeWindow from "@/components/Buttons/maximizeWindow/MaximizeWindow";
import MinimizeWindow from "@/components/Buttons/minimizeWindow/MinimizeWindow";

export default function Titlebar(props) {
  const [classes, setClasses] = useState(
    `${styles.container} ${props.focus ? styles.containerActive : ""}`
  );

  useEffect(() => {
    setClasses(
      `${styles.container} ${props.focus ? styles.containerActive : ""}`
    );
  }, [props.focus]);

  return (
    <div className={classes}>
      <div className={styles.titleWrapper}>
        <div className={styles.title}>
          {props.icon && <img className={styles.icon} src={props.icon} />}
          <span>{props.title}</span>
        </div>
      </div>

      <div className={styles.buttonsContainer}>
        <MinimizeWindow focus={props.focus} onMinimize={props.onMinimize} />
        <MaximizeWindow focus={props.focus} onMaximize={props.onMaximize} />
        <CloseButton focus={props.focus} onClose={props.onClose} />
      </div>
    </div>
  );
}
