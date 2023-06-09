import { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Titlebar from '../../components/titleBar/Titlebar';
import { WINDOW_STATES } from '@/constants/windowStates';
import { getWindowState } from './windowHelper';
import './Window.css';

import {
  setWindowInFocus,
  setWindowState,
  setWindowPosition,
  setWindowDimensions,
} from '@/store/slices/taskManager';

let X = 0;
let Y = 0;
let WINDOW_POSX = null;
let WINDOW_POSY = null;
let MOUSE_DOWN = false;
let HAS_WINDOW_MOVED = false;
let RESIZE_DIRECTION = null;

const RESIZE_MOVEMENTS = {
  LEFT: 'HORIZONTAL',
  RIGHT: 'HORIZONTAL',
  TOP: 'VERTICAL',
  BOTTOM: 'VERTICAL',
  CORNER: 'BOTH',
};

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
    document.removeEventListener('mousemove', mouseMoveHandler, false);
    document.removeEventListener('mouseup', mouseUpHandler, false);
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

  const mouseUpHandlerForResize = (event) => {
    document.removeEventListener('mousemove', mouseMoveHandlerForResize, false);
    document.removeEventListener('mouseup', mouseUpHandlerForResize, false);
    WINDOW_POSX = null;
    WINDOW_POSY = null;
    MOUSE_DOWN = false;

    if (RESIZE_DIRECTION === 'LEFT' || RESIZE_DIRECTION === 'TOP') {
      dispatch(
        setWindowPosition({
          id: props.programInfo.id,
          left: windowRef.current.style.left,
          top: windowRef.current.style.top,
        })
      );
    }

    RESIZE_DIRECTION = null;

    dispatch(
      setWindowDimensions({
        id: props.programInfo.id,
        height: windowRef.current.style.height,
        width: windowRef.current.style.width,
      })
    );
  };

  const mouseMoveHandler = (event) => {
    if (!MOUSE_DOWN) return;

    HAS_WINDOW_MOVED = true;

    const dx = event.clientX - X + WINDOW_POSX;
    const dy = event.clientY - Y + WINDOW_POSY;

    windowRef.current.style.left = dx + 'px';
    windowRef.current.style.top = dy + 'px';
  };

  const mouseMoveHandlerForResize = (event) => {
    if (!MOUSE_DOWN || !RESIZE_DIRECTION) return;

    const dx = event.clientX - X;
    const dy = event.clientY - Y;

    const minHeight = parseInt(props.programInfo.windowConfig.minHeight);
    const minWidth = parseInt(props.programInfo.windowConfig.minWidth);

    switch (RESIZE_DIRECTION) {
      case 'RIGHT':
      case 'RIGHTBOTTOM':
        var newW = parseInt(props.programInfo.windowConfig.width) + dx;
        if (newW > minWidth) windowRef.current.style.width = newW + 'px';

        if (RESIZE_DIRECTION === 'RIGHTBOTTOM') {
          var height = parseInt(props.programInfo.windowConfig.height) + dy;
          if (height > minHeight)
            windowRef.current.style.height = height + 'px';
        }
        break;
      case 'BOTTOM':
      case 'LEFTBOTTOM':
        var newH = parseInt(props.programInfo.windowConfig.height) + dy;
        if (newH > minHeight) windowRef.current.style.height = newH + 'px';
        if (RESIZE_DIRECTION === 'LEFTBOTTOM') {
          var width = parseInt(props.programInfo.windowConfig.width) - dx;
          if (width > minWidth) {
            windowRef.current.style.left = dx + WINDOW_POSX + 'px';
            windowRef.current.style.width = width + 'px';
          }
        }
        break;
      case 'TOP':
      case 'RIGHTTOP':
        var height = parseInt(props.programInfo.windowConfig.height) - dy;
        if (height > minHeight) {
          windowRef.current.style.top = dy + WINDOW_POSY + 'px';
          windowRef.current.style.height = height + 'px';
        }
        if (RESIZE_DIRECTION === 'RIGHTTOP') {
          var newW = parseInt(props.programInfo.windowConfig.width) + dx;
          if (newW > minWidth) windowRef.current.style.width = newW + 'px';
        }
        break;
      case 'LEFT':
      case 'LEFTTOP':
        var width = parseInt(props.programInfo.windowConfig.width) - dx;
        if (width > minWidth) {
          windowRef.current.style.left = dx + WINDOW_POSX + 'px';
          windowRef.current.style.width = width + 'px';
        }
        if (RESIZE_DIRECTION === 'LEFTTOP') {
          var height = parseInt(props.programInfo.windowConfig.height) - dy;
          if (height > minHeight) {
            windowRef.current.style.top = dy + WINDOW_POSY + 'px';
            windowRef.current.style.height = height + 'px';
          }
        }
        break;
    }
  };

  const mouseDownHandler = (event) => {
    X = event.clientX;
    Y = event.clientY;
    MOUSE_DOWN = true;

    WINDOW_POSX = parseInt(windowRef.current.style.left);
    WINDOW_POSY = parseInt(windowRef.current.style.top);

    if (event.target.className.includes('window__resizer_track')) {
      const className = event.target.className.split(' ')[1];
      const direction = className.substring(22, className.length);
      if (!direction) return;
      RESIZE_DIRECTION = direction.toUpperCase();
      document.addEventListener('mousemove', mouseMoveHandlerForResize, false);
      document.addEventListener('mouseup', mouseUpHandlerForResize, false);
    } else {
      document.addEventListener('mousemove', mouseMoveHandler, false);
      document.addEventListener('mouseup', mouseUpHandler, false);
    }
  };

  if (props.programInfo.windowState === WINDOW_STATES.MINIMISED) return null;

  const dimensions = {
    width: props.programInfo.windowConfig.width,
    height: props.programInfo.windowConfig.height,
    left: props.programInfo.windowConfig.position.left,
    top: props.programInfo.windowConfig.position.top,
    zIndex: props.programInfo.zIndex,
    minWidth: props.programInfo.windowConfig.minWidth,
    minHeight: props.programInfo.windowConfig.minHeight,
  };

  let winContentClasses = 'window__content ';
  winContentClasses +=
    props.programInfo.windowState === WINDOW_STATES.MAXIMIZED
      ? 'window__maximized'
      : '';

  let winClassStr = 'window__container ';
  winClassStr += props.programInfo.isFocused ? 'active ' : '';
  winClassStr +=
    props.programInfo.windowState === WINDOW_STATES.MAXIMIZED
      ? 'window__maximized '
      : '';

  return (
    <div
      className={winClassStr}
      style={dimensions}
      ref={windowRef}
      onMouseDown={setFocus}
    >
      {props.programInfo.windowState !== WINDOW_STATES.MAXIMIZED &&
        props.programInfo.windowConfig.resizable && (
          <div className="window__resizer-container">
            <div
              className="window__resizer_track window__resizer_track_top"
              onMouseDown={mouseDownHandler}
            />
            <div
              className="window__resizer_track window__resizer_track_right"
              onMouseDown={mouseDownHandler}
            />
            <div
              className="window__resizer_track window__resizer_track_bottom"
              onMouseDown={mouseDownHandler}
            />
            <div
              className="window__resizer_track window__resizer_track_left"
              onMouseDown={mouseDownHandler}
            />

            <div
              className="window__resizer_track window__resizer_track_leftTop"
              onMouseDown={mouseDownHandler}
            />
            <div
              className="window__resizer_track window__resizer_track_rightBottom"
              onMouseDown={mouseDownHandler}
            />
            <div
              className="window__resizer_track window__resizer_track_rightTop"
              onMouseDown={mouseDownHandler}
            />
            <div
              className="window__resizer_track window__resizer_track_leftBottom"
              onMouseDown={mouseDownHandler}
            />
          </div>
        )}

      <div
        onDoubleClick={windowStateChangeHandler}
        onMouseDown={mouseDownHandler}
        className="window__titlebar-container"
      >
        <Titlebar
          focus={props.programInfo.isFocused}
          onClose={props.onClose}
          onMaximize={windowStateChangeHandler}
          onMinimize={onMinimize}
          title={props.programInfo.name}
          icon={props.programInfo.icon}
          buttonsConfig={props.programInfo.windowConfig.buttons}
        />
      </div>

      <div className={winContentClasses}>{props.children}</div>
    </div>
  );
}
