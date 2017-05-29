import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchData } from '../actions/index';
import { Link } from 'react-router';
import RowNumberSelector from '../containers/RowNumberSelector';
import UsernameFilter from '../containers/UsernameFilter';
import styled from 'styled-components';

const Title = styled.h1`
  margin: 30px;
`;

const NavigationButton = styled.button`
  background-color: papayawhip;
  margin: 10px;
`;

const Row = styled.tr`
  background-color: ${props => props.isUser ? 'lightgreen' : 'white'};
`;

const LogoutLink = styled.span`
  margin-bottom: 16px;
  float: right;
`

class DataTable extends Component {

  constructor(props) {
    super(props);

    this.state = {page: 0, isUser: false};
  }

  nextPage = () => {
    this.setState((previousState, currentProps) => {
      return {page: previousState.page + 1};
    });
  }

  previousPage = () => {
    this.setState((previousState, currentProps) => {
      return {page: previousState.page - 1};
    });
  }

  logout = () => {
    localStorage['RTD:user'] = '';
    //localStorage.clear();
  }

  renderData(){

  if (localStorage['RTD:user']) { //GITANADA...
    this.props.fetchData();
  }  

  let allData = this.props.data;

  if (this.props.userFilter) { //Filter by username in case there is one selected
    let filteredByUsername = [];
    allData.map((item) => {if (item.userFilter === (this.props.userFilter)){ filteredByUsername.push(item); }}); //TODO: Usar quizas la funcion 'filter' mejor?
    allData = filteredByUsername;
  }

  let rowsPerPage = parseInt(this.props.rowsNumber);
  //let filteredData = this.props.data.slice(0, rowsPerPage);
  let page = this.state.page;
  let filteredData = allData.slice(page*rowsPerPage, (page*rowsPerPage) + rowsPerPage);

      return(
      filteredData.map((item, i) => 
        <Row isUser={localStorage['RTD:user'] === item.username} key={i}>
          <td>{item.id}</td>
          <td>{item.username}</td>
          <td>{item.postTitle}</td>
          <td>{item.views}</td>
          <td>{item.likes}</td>
          <td>{item.createdAt}</td>
        </Row> 
        )
      )
  }

  render() {//TODO: quizas pasar el estado de la pagina a una accion en RowNumberSelector

  const pagesVector = ['5','10','15','20'];

    return (
      <div className="App">
      <Title>ReactTabularDatasets</Title>
      <span>
        <Link to="/login" onClick={this.logout}>
          Logout
        </Link>
      </span>
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
        <p> Page: {this.state.page + 1} </p>
          <NavigationButton className="btn btn-secondary" onClick={this.previousPage} disabled={(this.state.page === 0)}>
            Previous page
          </NavigationButton>
          <NavigationButton className="btn btn-secondary" onClick={this.nextPage}
                  disabled={((parseInt(this.props.rowsNumber)*(this.state.page+1)) >= this.props.data.length)} >
            Next page
          </NavigationButton>
          <RowNumberSelector
            pagesVector={pagesVector} />
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
    return ({data: state.data.data, rowsNumber: state.rowsNumber.rowsNumber, userFilter: state.userFilter.userFilter});
  }

  function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchData }, dispatch);
  }

export default connect(mapStateToProps, mapDispatchToProps)(DataTable);