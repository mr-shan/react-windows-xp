import { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Titlebar from "./../../titleBar/Titlebar";
import styles from "./Window.module.css";

import { setWindowInFocus } from "../../../store/slices/windowManagement";

export default function Window(props) {
  const dispatch = useDispatch();
  const windowRef = useRef();

  const [dimensions, setDimensions] = useState(
    {
      width: props?.width || 720,
      height: props?.height || 512,
      left: "100px",
      top: "100px",
      zIndex: 1,
    }
  );
  const [isFocus, setIsFocus] = useState(false)
  const [classes, setClasses] = useState(
    `${styles.content} ${isFocus ? styles.contentActive : ''}`
  );
  
  const focusedWindow = useSelector(
    (state) => state.windowManagement.windowInFocus
  );

  useEffect(() => {
    setIsFocus(focusedWindow == props.id)
  }, [focusedWindow])

  useEffect(() => {
    const oldDim = { ...dimensions };
    oldDim["zIndex"] = isFocus ? 10 : 1;
    setDimensions(oldDim);
    setClasses(`${styles.content} ${isFocus ? styles.contentActive : ''}`)
  }, [isFocus]);

  const mouseMoveHandler = (event) => {
    const curL = windowRef?.current?.style?.left.split("px")[0];
    const curT = windowRef?.current?.style?.top.split("px")[0];

    windowRef.current.style.left = parseInt(curL) + event.movementX + "px";
    windowRef.current.style.top = parseInt(curT) + event.movementY + "px";
  };

  const setFocus = (event) => {
    event.stopPropagation();
    dispatch(setWindowInFocus(props.id));
  };

  return (
    <div
      className={styles.container}
      style={dimensions}
      ref={windowRef}
      onMouseDown={setFocus}
    >
      <Titlebar mouseMove={mouseMoveHandler} focus={isFocus}/>
      <div className={classes}>
        <textarea className={styles.textarea}></textarea>
      </div>
    </div>
  );
}
