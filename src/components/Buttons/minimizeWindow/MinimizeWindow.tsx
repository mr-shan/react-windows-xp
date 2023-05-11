import { useState, useEffect } from "react";

import styles from "./MinimizeWindow.module.css";

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
    <button className={classes} onClick={props.onMinimize} onMouseDown={(event) => event.stopPropagation()}>
      <div className={styles.maximizeIcon}></div>
    </button>
  );
}
