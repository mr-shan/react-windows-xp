import { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Titlebar from "../../components/titleBar/Titlebar";
import { WINDOW_STATES } from "@/constants/windowStates";
import styles from "./Window.module.css";

import { setWindowInFocus } from "@/store/slices/windowManagement";

export default function Window(props) {
  const dispatch = useDispatch();
  const windowRef = useRef();

  const [dimensions, setDimensions] = useState({
    width: props.programInfo.windowConfig?.width || 720,
    height: props.programInfo.windowConfig?.height || 512,
    left: "100px",
    top: "100px",
    zIndex: 1,
  });
  const [isFocus, setIsFocus] = useState(false);
  const [classes, setClasses] = useState(
    `${styles.content} ${isFocus ? styles.contentActive : ""}`
  );
  const [windowState, setWindowState] = useState(WINDOW_STATES.NORMAL);

  const focusedWindow = useSelector(
    (state) => state.windowManagement.windowInFocus
  );

  useEffect(() => {
    dispatch(setWindowInFocus(props.programInfo.id));
  }, []);

  useEffect(() => {
    setIsFocus(focusedWindow == props.programInfo.id);
  }, [focusedWindow]);

  useEffect(() => {
    const oldDim = { ...dimensions };
    oldDim["zIndex"] = isFocus ? 10 : 1;
    setDimensions(oldDim);
    setClasses(`${styles.content} ${isFocus ? styles.contentActive : ""}`);
  }, [isFocus]);

  useEffect(() => {
    const oldDim = { ...dimensions };
    if (windowState === WINDOW_STATES.MAXIMIZED) {
      oldDim.width = "100%";
      oldDim.height = "100%";
      oldDim.left = "0";
      oldDim.top = "0";
    } else {
      oldDim.width = props.programInfo.windowConfig?.width || 720;
      oldDim.height = props.programInfo.windowConfig?.height || 720;
      oldDim.left = "100px";
      oldDim.top = "100px";
    }

    setDimensions(oldDim);
    setClasses(
      `${styles.content} ${isFocus ? styles.contentActive : ""} ${
        windowState === WINDOW_STATES.MAXIMIZED ? styles.noWindowBorders : ""
      }`
    );
  }, [windowState]);

  const mouseMoveHandler = (event) => {
    const curL = windowRef?.current?.style?.left.split("px")[0];
    const curT = windowRef?.current?.style?.top.split("px")[0];

    windowRef.current.style.left = parseInt(curL) + event.movementX + "px";
    windowRef.current.style.top = parseInt(curT) + event.movementY + "px";
  };

  const setFocus = (event) => {
    event.stopPropagation();
    dispatch(setWindowInFocus(props.programInfo.id));
  };

  const windowStateChangeHandler = (event) => {
    const newState =
      windowState === WINDOW_STATES.NORMAL
        ? WINDOW_STATES.MAXIMIZED
        : WINDOW_STATES.NORMAL;
    setWindowState(newState);
  };
  return (
    <div
      className={styles.container}
      style={dimensions}
      ref={windowRef}
      onMouseDown={setFocus}
    >
      <Titlebar
        mouseMove={mouseMoveHandler}
        focus={isFocus}
        onClose={props.onClose}
        onStateChange={windowStateChangeHandler}
      >
        <div className={styles.title}>
          {props.programInfo.icon && (
            <img className={styles.icon} src={props.programInfo.icon} />
          )}
          {props.programInfo.name}
        </div>
      </Titlebar>
      <div className={classes}>{props.children}</div>
    </div>
  );
}
