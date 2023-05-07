import { configureStore } from '@reduxjs/toolkit'

import taskManagerReducer from './slices/taskManager'

export default configureStore({
  reducer: {
    taskManager: taskManagerReducer
  },
})