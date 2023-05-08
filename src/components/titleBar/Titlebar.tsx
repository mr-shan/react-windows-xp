import { useState, useEffect } from "react";
import styles from "./Titlebar.module.css";
import CloseButton from "../Buttons/closeButton/CloseButton";

export default function Titlebar(props) {
  const [classes, setClasses] = useState(
    `${styles.container} ${props.focus ? styles.containerActive : ''}`
  );

  useEffect(() => {
    setClasses(`${styles.container} ${props.focus ? styles.containerActive : ''}`)
  }, [props.focus])


  const mouseDownHandler = (event) => {
    if (event.buttons == 1){
        props.mouseMove(event);
    }
  }

  return (
    <div className={classes} onMouseMove={(event) => mouseDownHandler(event)}>
      <div className={styles.title}>{props.children}</div>
      <div className={styles.buttonsContainer}>
        <CloseButton focus={props.focus} onClose={props.onClose}/>
      </div>
    </div>
  );
}
