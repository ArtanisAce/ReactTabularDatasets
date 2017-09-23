export default function(state, action) {
  switch(action.type) {
  case 'CREATE_RECORD':
    return { ...state, data: [ ...action.payload, ...state.data ] };    
  default:
    return state;
  }
}