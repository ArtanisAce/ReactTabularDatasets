import {mockedData} from '../mockedData';


export function fetchData() {

let data = mockedData;

	return {
    type: 'GET_DATA',
    payload: data
  }
};

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

export function createRecord(props) {

  console.log(props);

  return {
    type: 'CREATE_RECORD',
    payload: props
  }
}

