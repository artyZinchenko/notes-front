import { createSlice } from '@reduxjs/toolkit'
import noteServices from '../services/notes'

const notesSlice = createSlice({
  name: 'notes',
  initialState: [],
  reducers: {
    setNotes(state, action) {
      return action.payload
    },
    toggleImportance(state, action) {
      const changedNote = action.payload
      return state.map((note) =>
        note.id === changedNote.id ? changedNote : note
      )
    },
    deleteFromStore(state, action) {
      const noteToDelete = action.payload
      return state.filter((note) => note.id !== noteToDelete.id)
    },
    addNoteToStore(state, action) {
      const newNote = action.payload
      state.push(newNote)
    },
  },
})

export const initializeNotes = () => {
  return async (dispatch) => {
    const notes = await noteServices.getAll()
    dispatch(setNotes(notes))
  }
}

// export const deleteNoteAction = () => {
//   return asy
// }

export const { setNotes, toggleImportance, deleteFromStore, addNoteToStore } =
  notesSlice.actions
export default notesSlice.reducer
