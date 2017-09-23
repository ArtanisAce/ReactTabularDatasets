const initialState = { username: '' };

export default function(state = initialState, action) {
  switch(action.type) {
  case 'LOG_IN':
    return { username: action.payload };
  default:
    return state;
  }
}