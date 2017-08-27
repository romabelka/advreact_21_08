import React, { Component } from 'react';
import {reduxForm, Field} from 'redux-form';
import emailValidator from 'email-validator';
import ErrorField from '../common/ErrorField';
import {addPeople} from '../../ducks/people';
import {connect} from 'react-redux';

class AddPeoplePage extends Component {
  render() {
    const {handleSubmit} = this.props
    return (
      <form onSubmit={handleSubmit(this.submitForm)}>
        <Field name="firstName" component={ErrorField} />
        <Field name="lastName" component={ErrorField} />
        <Field name="email" component={ErrorField} />
        <div>
            <input type="submit" />
        </div>
      </form>
    );
  }

  submitForm = ({firstName, lastName, email}) => {
    this.props.addPeople(firstName, lastName, email);
  }
}

const validate = ({firstName, lastName, email}) => {
  const errors = {}

  if (!firstName) errors.firstName = 'First name is required';

  if (!lastName) errors.lastName = 'Last name is required';

  if (!email) errors.email = 'email is required'
  else if (!emailValidator.validate(email)) errors.email = 'invalid email'

  return errors
}

export default connect(null, {addPeople})(reduxForm({
  form: 'addPeople',
  validate
})(AddPeoplePage));