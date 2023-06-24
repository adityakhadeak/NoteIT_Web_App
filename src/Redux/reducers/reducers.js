const initialState = {
    notes: [],
  };
  
  function rootReducer(state = initialState, action) {
    if (action.type === 'ADD_NOTE') {
      return {
        notes: [
          ...state.notes,
          {
            id: state.notes.length + 1,
            title: action.payload.title,
            content: action.payload.content
          }
        ]
      };
    } else if (action.type === 'REMOVE_NOTE') {
      return {
        notes: state.notes.filter(note => note.id !== action.payload.id)
      };
    } else if (action.type === 'UPDATE_NOTE') {
      return {
        notes: state.notes.map(note => {
          if (note.id === action.payload.id) {
            return {
              ...note,
              title: action.payload.title,
              content: action.payload.content
            };
          } else {
            return note;
          }
        })
      };
    } else {
      return state;
    }
  }
  
  export default rootReducer;
  