import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeRowsNumber } from '../actions/index';
import styled from 'styled-components';

const PageButton = styled.button`
  margin: 10px;
  background-color: lightgreen
`;

const PagesSelector =  ({pagesVector, changeRowsNumber}) => {

    return(
      <div>
        {pagesVector.map(function(n,i){
          return (
            <PageButton key={i} className="page-btn" onClick={(changeRowsNumber.bind(this,n))}> {n} </PageButton>
          );
        }.bind(this))}
      </div>
    );
  }

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changeRowsNumber }, dispatch);
}

export default connect(null, mapDispatchToProps)(PagesSelector);
