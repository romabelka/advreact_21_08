import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import ErrorField from '../common/ErrorField';
import { getEmailFieldError } from '../../helpers';

class NewPersonForm extends Component {
  render() {
    return (
      <div>
        <h2>New Person</h2>
        <form onSubmit={this.props.handleSubmit}>
          <Field name="firstName" label="First Name" component={ErrorField} />
          <Field name="lastName" label="Last Name" component={ErrorField} />
          <Field name="email" label="Email" component={ErrorField} />
          <input type="submit" />
        </form>
      </div>
    );
  }
}

NewPersonForm.propTypes = {};
NewPersonForm.defaultProps = {};

const validate = ({ firstName, lastName, email }) => {
  const errors = {}

  if (!firstName) errors.firstName = 'first name is required'
  if (!lastName) errors.lastName = 'last name is required'
  
  const emailError = getEmailFieldError(email)
  if (emailError) errors.email = emailError

  return errors;
}

export default reduxForm({
  form: 'newPerson',
  validate
})(NewPersonForm);
