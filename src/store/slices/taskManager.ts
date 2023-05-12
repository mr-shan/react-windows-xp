import { nanoid } from "nanoid";
import { createSlice } from "@reduxjs/toolkit";
import * as PROGRAMS from "./../../constants/programs";
import { WINDOW_STATES } from "../../constants/windowStates";

let WINDOW_FOCUS_COUNTER = 10;

//helper functions
const defocusCurrentWindow = (state) => {
  const oldWindowInFocus = state.runningTasks.find(e => e.id === state.windowInFocus);
  if (oldWindowInFocus) {
    oldWindowInFocus.isFocused = false;
  }
  return oldWindowInFocus;
}

export const taskManager = createSlice({
  name: "taskManager",
  initialState: {
    runningTasks: new Array<any>(),
    windowInFocus: null,  // this stores ID only.
  },
  reducers: {
    createNewTask: (state, action) => {
      const programConfig = PROGRAMS[action.payload.name];
      if (!programConfig) {
        // TODO handle error
        return;
      }

      defocusCurrentWindow(state);

      const newProgram = { ...programConfig };
      newProgram.id = nanoid();
      newProgram.isFocused = true;
      newProgram.windowState = WINDOW_STATES.NORMAL
      newProgram.zIndex = ++WINDOW_FOCUS_COUNTER;
      state.windowInFocus = newProgram.id;
      state.runningTasks.push(newProgram);
    },

    closeTask: (state, action) => {
      state.runningTasks = state.runningTasks.filter(
        (e) => e.id !== action.payload
      );
    },

    setWindowInFocus: (state, action) => {
      defocusCurrentWindow(state);
      state.windowInFocus = action.payload;
      
      const newWindowInFocus = state.runningTasks.find(task => task.id === action.payload);
      if (newWindowInFocus) {
        newWindowInFocus.isFocused = true;
        newWindowInFocus.zIndex = ++WINDOW_FOCUS_COUNTER;
        if (newWindowInFocus.windowState === WINDOW_STATES.MINIMISED)
          newWindowInFocus.windowState = newWindowInFocus.oldWindowState || WINDOW_STATES.NORMAL;
      }
    },

    setWindowState: (state, action) => {
      const windowInFocus = state.runningTasks.find(e => e.id === action.payload.id);
      if (windowInFocus) {
        windowInFocus.oldWindowState = windowInFocus.windowState
        windowInFocus.windowState = action.payload.state;
      }

      if (action.payload.state === WINDOW_STATES.MINIMISED) {
        // change the focus to another window.
        windowInFocus.isFocused = false;
      }
    },

    setWindowPosition: (state, { payload }) => {
      const win = state.runningTasks.find(e => e.id === payload.id);
      if (!win) return;

      win.windowConfig.position = { top: payload.top, left: payload.left };
    },

    setWindowDimensions: (state, { payload }) => {
      const win = state.runningTasks.find(e => e.id === payload.id);
      if (!win) return;

      win.windowConfig.height = payload.height;
      win.windowConfig.width = payload.width;

      console.log(payload)
    }
  },
});

// Action creators are generated for each case reducer function
export const { createNewTask, closeTask, setWindowInFocus, setWindowState, setWindowPosition, setWindowDimensions } =
  taskManager.actions;

export default taskManager.reducer;
