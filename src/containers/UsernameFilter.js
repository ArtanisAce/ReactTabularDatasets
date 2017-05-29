import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { filterByUser } from '../actions/index';
import styled from 'styled-components';

const SearchButton = styled.button`
  margin-left: 8px;
  background-color: lightgray
  border-radius: 10%;
`;

class UsernameFilter extends Component {
    
  constructor(props) {
    super(props);

    this.state = { term: '' };

  }

  onInputChange = (event) => {
    this.setState({ term: event.target.value });
  }

  onFormSubmit = (event) => {
    event.preventDefault();

    this.props.filterByUser(this.state.term);
    this.setState({ term: '' });
  }

  render() {
    return (
      <form onSubmit={this.onFormSubmit} className="input-group">
        <input
          placeholder="Search for a username..."
          className="form-control"
          value={this.state.term}
          onChange={this.onInputChange} />
        <span className="input-group-btn">
          <SearchButton type="submit" className="btn btn-secondary">Filter</SearchButton>
        </span>
      </form>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ filterByUser }, dispatch);
}

export default connect(null, mapDispatchToProps)(UsernameFilter);