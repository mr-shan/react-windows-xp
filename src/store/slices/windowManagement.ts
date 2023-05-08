import { createSlice } from "@reduxjs/toolkit";

export const taskManager = createSlice({
  name: "windowManagement",
  initialState: {
    windowInFocus: null,
    movingWindow: null
  },
  reducers: {
    setWindowInFocus: (state, action) => {
      state.windowInFocus = action.payload
    },
  },
});

// Action creators are generated for each case reducer function
export const { setWindowInFocus } = taskManager.actions;

export default taskManager.reducer;
