import React, { Component } from 'react';
import DataTable from '../containers/DataTable';


export default class App extends Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
