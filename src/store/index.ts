import { configureStore } from '@reduxjs/toolkit'

import taskManagerReducer from './slices/taskManager'
import windowManagementReducer from './slices/windowManagement'

export default configureStore({
  reducer: {
    taskManager: taskManagerReducer,
    windowManagement: windowManagementReducer
  },
})