const initialState = { userFilter: '' };

export default function(state = initialState, action) {
  switch(action.type) {
  case 'FILTER_USER':
    return { userFilter: action.payload };
  default:
    return state;
  }
}