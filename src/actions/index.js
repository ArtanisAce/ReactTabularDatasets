import {mockedData} from '../mockedData';
import { createAction } from 'redux-actions';
export const fetchD = createAction('GET_DATA');

export function fetchData() {
  
  return function(dispatch) {
      let data;

if (localStorage['RTD:createdPosts'] !== undefined){
  let mockedDataWithRecord = JSON.parse(localStorage['RTD:createdPosts']);
  data = [...mockedData, mockedDataWithRecord];
} else {
  data = mockedData;
}

	// return {
  //   type: 'GET_DATA',
  //   payload: data
  // }

        dispatch(fetchD({
        payload: data,
      }));
  }


};

export function handleLogin(user) {
  localStorage['RTD:user'] = user;

  return {
    type: 'LOG_IN',
    payload: user
  }
}

export function changeRowsNumber(newNumber) {

  return {
    type: 'CHANGE_ROWS',
    payload: newNumber
  }

}

export function filterByUser(username) {
  
  return {
    type: 'FILTER_USER',
    payload: username
  }
}

export function createRecord(newRecord) {

newRecord.username = localStorage['RTD:user'];
// Save new record on localStorage (persisting data)
localStorage['RTD:createdPosts'] = JSON.stringify(newRecord);

let data = [...mockedData, newRecord];

  return {
    type: 'GET_DATA',
    payload: data
  }
}

