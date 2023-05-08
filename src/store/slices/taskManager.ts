import { nanoid } from "nanoid";
import { createSlice } from "@reduxjs/toolkit";
import * as PROGRAMS from "./../../constants/programs";

export const taskManager = createSlice({
  name: "taskManager",
  initialState: {
    runningTasks: new Array<any>(),
  },
  reducers: {
    createNewTask: (state, action) => {
      const programConfig = PROGRAMS[action.payload.name];
      if (!programConfig) {
        // TODO handle error
        return;
      }

      const newProgram = { ...programConfig };
      newProgram.id = nanoid();
      state.runningTasks.push(newProgram);
    },
    closeTask: (state, action) => {
      state.runningTasks = state.runningTasks.filter(
        (e) => e.id !== action.payload
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const { createNewTask, closeTask } = taskManager.actions;

export default taskManager.reducer;
