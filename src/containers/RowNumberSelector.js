import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeRowsNumber } from '../actions/index';
import styled from 'styled-components';

const PageButton = styled.button`
  margin: 10px;
  background-color: lightgreen
`;

class PagesSelector extends Component {

  render(){
    return(
      <div>
        {this.props.pagesVector.map(function(n,i){
          return (
            <PageButton key={i} className="page-btn" onClick={(this.props.changeRowsNumber.bind(this,n))}> {n} </PageButton>
          );
        }.bind(this))}
      </div>
    );
  }
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changeRowsNumber }, dispatch);
}

export default connect(null, mapDispatchToProps)(PagesSelector);
