import { createSlice } from "@reduxjs/toolkit";

interface ITask {
  id: number;
  name: string;
  program: string;
}

export const taskManager = createSlice({
  name: "taskManager",
  initialState: {
    runningTasks: Array<ITask>(),
  },
  reducers: {
    createNewTask: (state, action) => {
      console.log("New task alert", action.payload);
      state.runningTasks.push(action.payload);
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
