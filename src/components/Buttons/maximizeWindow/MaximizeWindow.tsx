import { useState, useEffect } from "react";

import styles from "./MaximizeWindow.module.css";
import maximize from "@/assets/logos/maximize.png";

export default function CloseButton(props) {
  const [classes, setClasses] = useState(
    `${styles.button} ${props.focus ? styles.buttonActive : ""}`
  );

  useEffect(() => {
    setClasses(
      `${styles.button} ${props.focus ? styles.buttonActive : ""}`
    );
  }, [props.focus]);
  return (
    <button className={classes} onClick={props.onMaximize}>
      <div className={styles.maximizeIcon}></div>
    </button>
  );
}
