import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import Titlebar from "../../components/titleBar/Titlebar";
import { WINDOW_STATES } from "@/constants/windowStates";
import { getWindowState } from "./windowHelper";
import "./Window.css";

import {
  setWindowInFocus,
  setWindowState,
  setWindowPosition,
} from "@/store/slices/taskManager";

let X = 0;
let Y = 0;
let WINDOW_POSX = null;
let WINDOW_POSY = null;
let MOUSE_DOWN = false;
let HAS_WINDOW_MOVED = false;

export default function Window(props) {
  const dispatch = useDispatch();
  const windowRef = useRef();

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
    document.removeEventListener("mousemove", mouseMoveHandler, false);
    document.removeEventListener("mouseup", mouseUpHandler, false);
    MOUSE_DOWN = false;
    WINDOW_POSX = null;
    WINDOW_POSY = null;

    if (!HAS_WINDOW_MOVED) return;

    HAS_WINDOW_MOVED = false;

    dispatch(
      setWindowPosition({
        id: props.programInfo.id,
        left: windowRef.current.style.left,
        top: windowRef.current.style.top,
      })
    );
  };

  const mouseMoveHandler = (event) => {
    if (!MOUSE_DOWN) return;

    HAS_WINDOW_MOVED = true;

    const dx = event.clientX - X + WINDOW_POSX;
    const dy = event.clientY - Y + WINDOW_POSY;

    windowRef.current.style.left = dx + "px";
    windowRef.current.style.top = dy + "px";
  };

  const mouseDownHandler = (event) => {
    X = event.clientX;
    Y = event.clientY;
    MOUSE_DOWN = true;

    WINDOW_POSX = parseInt(windowRef.current.style.left);
    WINDOW_POSY = parseInt(windowRef.current.style.top);

    document.addEventListener("mousemove", mouseMoveHandler, false);
    document.addEventListener("mouseup", mouseUpHandler, false);
  };

  if (props.programInfo.windowState === WINDOW_STATES.MINIMISED) return null;

  const dimensions = {
    width: props.programInfo.windowConfig.width,
    height: props.programInfo.windowConfig.height,
    left: props.programInfo.windowConfig.position.left,
    top: props.programInfo.windowConfig.position.top,
    zIndex: props.programInfo.isFocused ? 10 : 1,
  };

  let winContentClasses = "window__content ";
  winContentClasses += props.programInfo.isFocused ? "active " : "";
  winContentClasses +=
    props.programInfo.windowState === WINDOW_STATES.MAXIMIZED
      ? "window__no-orders window__maximized"
      : "";

  let winClassStr = "window__container ";
  winClassStr +=
    props.programInfo.windowState === WINDOW_STATES.MAXIMIZED
      ? "window__maximized "
      : "";

  return (
    <div
      className={winClassStr}
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

      <div className={winContentClasses}>{props.children}</div>
    </div>
  );
}
