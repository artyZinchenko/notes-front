import { configureStore } from '@reduxjs/toolkit'
import filterReducer from './reducers/filterReducer'
import notesReducer from './reducers/notesReducer'

const store = configureStore({
  reducer: {
    filter: filterReducer,
    notes: notesReducer,
  },
})

export default store
