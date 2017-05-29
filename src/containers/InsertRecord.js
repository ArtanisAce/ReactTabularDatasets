import React, { Component, PropTypes } from 'react';
import { Router, browserHistory, Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { createRecord } from '../actions/index';
import styled from 'styled-components';


const FormTitle = styled.h3`
margin: 30px;
font-weight:bold;
font-size: 2em;
`;

const SubmitButton = styled.button`
margin: 25px;
background-color: lightblue;
`;

const form = reduxForm({  
  form: 'InsertRecord',
  validate
});


const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type}/>
      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
)

function validate(formProps) {  
  const errors = {};
//TODO: add positive integer validation
  if (!formProps.id) {
    errors.id = 'Please enter an ID';
  }

  if (!formProps.postTitle) {
    errors.postTitle = 'Please enter a title';
  }

  if (!formProps.views) {
    errors.views = 'Please enter number of views';
  }

  if (!formProps.likes) {
    errors.likes = 'Please enter number of likes';
  }

  if(!formProps.createdAt) {
    errors.createdAt = 'You must enter a date!'
  }

  return errors;
}

class InsertRecord extends Component {

  handleFormSubmit = (formProps) => {
    this.props.createRecord(formProps);
  setTimeout(() => {  
    browserHistory.push('/');
    }, (2000));    
  }

	render(){

		const { handleSubmit } = this.props;

    return (
			<div>
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <FormTitle>Insert a new record</FormTitle>
          <Field name="id" type="text" component={renderField} label="ID"/>  
          <Field name="postTitle" type="text" component={renderField} label="Title"/>
          <Field name="views" type="text" component={renderField} label="Views"/>
          <Field name="likes" type="text" component={renderField} label="Likes" />
          <Field name="createdAt" type="date" component={renderField} label="Created At"/>

          <SubmitButton action="submit" className="btn btn-primary">Submit</SubmitButton>
          <Link to="/" className="btn btn-danger">Cancel</Link>
        </form>
      </div>
    )
	}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ createRecord }, dispatch);
}

export default connect(null, mapDispatchToProps)(form(InsertRecord));