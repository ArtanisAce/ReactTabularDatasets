const initialState = { username: '' };

export default function(state = initialState, action) {
  switch(action.type) {
  case 'FILTER_USER':
    return { username: action.payload };
  default:
    return state;
  }
}