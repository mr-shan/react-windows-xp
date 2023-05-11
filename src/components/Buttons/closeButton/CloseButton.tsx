import { useState, useEffect } from "react";

import styles from "./CloseButton.module.css";
import cross2 from "@/assets/logos/cross2.png";

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
    <button className={classes} onClick={props.onClose} onMouseDown={(event) => event.stopPropagation()}>
      <img src={cross2} />
    </button>
  );
}
