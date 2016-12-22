import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchData } from '../actions/index';
import { Link } from 'react-router';
import RowNumberSelector from '../containers/RowNumberSelector';
import UsernameFilter from '../containers/UsernameFilter';
import styled from 'styled-components';


const NavigationButton = styled.button`
  background-color: papayawhip;
  margin: 10px;
`;

class DataTable extends Component {

constructor(props) {
  super(props);
  this.nextPage = this.nextPage.bind(this);
  this.previousPage = this.previousPage.bind(this);

  this.state = {page: 0};
}

nextPage() {
  this.setState((previousState, currentProps) => {
    return {page: previousState.page + 1};
  });
}

previousPage() {
  this.setState((previousState, currentProps) => {
    return {page: previousState.page - 1};
  });
}

renderData(){

this.props.fetchData();
let allData = this.props.data;
console.log(allData);
// We want to append a new record if it has been submitted by the user
//TODO: listen to the store and get the new record; username should be compared with localStorage one (authenticated at the start) 


if (this.props.username) { //Filter by username in case there is one selected
  let filteredByUsername = [];
  allData.map((item) => {if (item.username === (this.props.username)){ filteredByUsername.push(item); }});
  allData = filteredByUsername;
}

let rowsPerPage = parseInt(this.props.rowsNumber);
//let filteredData = this.props.data.slice(0, rowsPerPage);
let page = this.state.page;
let filteredData = allData.slice(page*rowsPerPage, (page*rowsPerPage) + rowsPerPage);

    return(
    filteredData.map((item, i) => 
      <tr key={i}>
        <td>{item.id}</td>
        <td>{item.username}</td>
        <td>{item.postTitle}</td>
        <td>{item.views}</td>
        <td>{item.likes}</td>
        <td>{item.createdAt}</td>
      </tr> 
      )
    )
}

render() {//TODO: quizas pasar el estado de la pagina a una accion en RowNumberSelector
  return (
    <div className="App">
    <h1>ReactTabularDatasets</h1>
    <UsernameFilter />
    <div>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>ID</th>
            <th>User name</th>
            <th>Post title</th>
            <th>Views</th>
            <th>Likes</th>
            <th>Created at</th>
          </tr>
        </thead>
        <tbody>
        {this.renderData()}
        </tbody>
      </table>
      <div className="btns">
      <p> Page: {this.state.page} </p>
        <NavigationButton className="btn btn-secondary" onClick={this.previousPage} disabled={(this.state.page === 0)}>
          Previous page
        </NavigationButton>
        <NavigationButton className="btn btn-secondary" onClick={this.nextPage}
                disabled={((parseInt(this.props.rowsNumber)*(this.state.page+1)) >= this.props.data.length)} >
          Next page
        </NavigationButton>
        <RowNumberSelector
          pagesVector={['5','10','15','20']} />
        <Link to="/newRecord" className="btn btn-primary">
          Insert new record
        </Link>
      </div>
    </div>
    </div>
    );
  }
}


function mapStateToProps(state){
  return ({data: state.data.data, rowsNumber: state.rowsNumber.rowsNumber, username: state.username.username});
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchData }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DataTable);