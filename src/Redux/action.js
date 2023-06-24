export function addNote(title, content){
    return {
      type: 'ADD_NOTE',
      payload: { title, content }
    }
  }
  
  export function removeNote(id){
    return {
      type: 'REMOVE_NOTE',
      payload: { id }
    }
  }
  
  export function updateNote(id, title, content) {
    return {
      type: 'UPDATE_NOTE',
      payload: { id, title, content }
    };
  }
  