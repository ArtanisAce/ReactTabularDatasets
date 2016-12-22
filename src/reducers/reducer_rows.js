const initialState = { rowsNumber: 5 };

export default function(state = initialState, action) {
  switch(action.type) {
  case 'CHANGE_ROWS':
    return { rowsNumber: action.payload };
  default:
    return state;
  }
}