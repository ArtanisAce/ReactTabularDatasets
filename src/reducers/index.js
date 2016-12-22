import { combineReducers } from 'redux';
import DataReducer from './reducer_data';
import RowsReducer from './reducer_rows';
import UsernameReducer from './reducer_filter';
import { reducer as formReducer } from 'redux-form';


const rootReducer = combineReducers({
  data: DataReducer,
  rowsNumber: RowsReducer,
  username: UsernameReducer,
  form: formReducer 
});

export default rootReducer;

