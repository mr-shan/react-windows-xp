import { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Titlebar from "../../components/titleBar/Titlebar";
import { WINDOW_STATES } from "@/constants/windowStates";
import { getDimensionObject, getWindowState } from "./windowHelper";
import "./Window.css";

import { setWindowInFocus, setWindowState } from "@/store/slices/taskManager";

let X = 0;
let Y = 0;
let WINDOW_POSX = null;
let WINDOW_POSY = null;
let MOUSE_DOWN = false

export default function Window(props) {
  const dispatch = useDispatch();
  const windowRef = useRef();

  const [dimensions, setDimensions] = useState(
    getDimensionObject(
      props.programInfo.windowConfig?.width,
      props.programInfo.windowConfig?.height,
      "100px",
      "100px",
      1,
      null
    )
  );

  const [classes, setClasses] = useState("window__content");
  const [mouseDownCord, setMouseDownCords] = useState(null);

  useEffect(() => {
    const oldDim = { ...dimensions };
    oldDim["zIndex"] = props.programInfo.isFocused ? 10 : 1;
    setDimensions(oldDim);
    setFocusClasses();
  }, [props.programInfo.isFocused]);

  useEffect(() => {
    const oldDim = { ...dimensions };
    if (props.programInfo.windowState === WINDOW_STATES.MAXIMIZED) {
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
    setFocusClasses();
  }, [props.programInfo.windowState]);

  const setFocusClasses = () => {
    let classStr = "window__content ";
    classStr += props.programInfo.isFocused ? "active " : "";
    classStr +=
      props.programInfo.windowState === WINDOW_STATES.MAXIMIZED
        ? "window__no-orders "
        : "";
    setClasses(classStr);
  };

  // const mouseMoveHandler = (event) => {
  //   const curL = windowRef?.current?.style?.left.split("px")[0];
  //   const curT = windowRef?.current?.style?.top.split("px")[0];

  //   windowRef.current.style.left = parseInt(curL) + event.movementX + "px";
  //   windowRef.current.style.top = parseInt(curT) + event.movementY + "px";
  // };

  const setFocus = (event) => {
    event.stopPropagation();
    dispatch(setWindowInFocus(props.programInfo.id));
  };

  const windowStateChangeHandler = () => {
    const newState = getWindowState(props.programInfo.windowState);
    dispatch(setWindowState({ state: newState, id: props.programInfo.id }));
  };

  const onMinimize = () => {
    dispatch(
      setWindowState({
        state: WINDOW_STATES.MINIMISED,
        id: props.programInfo.id,
      })
    );
  };

  const mouseUpHandler = (event) => {
    document.removeEventListener('mousemove', mouseMoveHandler, false);
    document.removeEventListener('mouseup', mouseUpHandler, false);
    MOUSE_DOWN = false;
    WINDOW_POSX = null;
    WINDOW_POSY = null;
  };

  const mouseMoveHandler = (event) => {
    if (!MOUSE_DOWN) return;
    
    const dx = event.clientX - X + WINDOW_POSX;
    const dy = event.clientY - Y + WINDOW_POSY;

    windowRef.current.style.left =  dx + "px";
    windowRef.current.style.top = dy + "px";
  };

  const mouseDownHandler = (event) => {
    X = event.clientX;
    Y = event.clientY;
    MOUSE_DOWN = true;

    WINDOW_POSX = parseInt(windowRef.current.style.left)
    WINDOW_POSY = parseInt(windowRef.current.style.top)

    document.addEventListener('mousemove', mouseMoveHandler, false);
    document.addEventListener('mouseup', mouseUpHandler, false);
  };

  if (props.programInfo.windowState === WINDOW_STATES.MINIMISED) return null;

  return (
    <div
      className="window__container"
      style={dimensions}
      ref={windowRef}
      onMouseDown={setFocus}
    >
      <div
        onDoubleClick={windowStateChangeHandler}
        onMouseDown={mouseDownHandler}
      >
        <Titlebar
          focus={props.programInfo.isFocused}
          onClose={props.onClose}
          onMaximize={windowStateChangeHandler}
          onMinimize={onMinimize}
          title={props.programInfo.name}
          icon={props.programInfo.icon}
        />
      </div>

      <div className={classes}>{props.children}</div>
    </div>
  );
}
