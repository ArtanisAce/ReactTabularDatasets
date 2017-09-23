import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchData, handleLogin } from '../actions/index';
import { Router, browserHistory } from 'react-router';

class Login extends Component {

constructor(props) {
  super(props);

  this.state = {username: '', password: '', isLoading: false};
}

  handleUsernameChange = (e) => {
    this.setState({
      username: e.target.value,
    });
  };

  handlePasswordChange = (e) => {
    this.setState({
      password: e.target.value,
    })
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.handleLogin(this.state.username);
    this.props.fetchData(); //Fetch initial data (mocked) to fill the table with custom rows for the user
    setTimeout(() => { // Simulate server fetching data...
    browserHistory.push('/');
  }, (2000));
  
  };

  render() {

    return (
      <form onSubmit={this.handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input className="form-control" placeholder="Username..." id="username" type="text" value={this.state.username} onChange={this.handleUsernameChange}/>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input className="form-control" placeholder="Password..." id="password" type="password" value={this.state.password} onChange={this.handlePasswordChange} />
        </div>
        <div className="form-group">
          <button
            className="btn btn-primary"
            type="submit"
            disabled={this.state.isLoading || !this.state.username || !this.state.password}
          >
            {this.state.isLoading ? 'Logging in...' : 'Login'}
          </button>
        </div>
      </form>
    )
  }
}

  function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchData, handleLogin }, dispatch);
  }

export default connect(null, mapDispatchToProps)(Login);