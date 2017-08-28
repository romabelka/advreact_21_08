import React from 'react'
import {reduxForm, Field} from 'redux-form'
import emailValidator from 'email-validator'
import ErrorField from '../common/ErrorField'

let people

const PeopleForm = ({handleSubmit, peopleList}) => {

  people = peopleList

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Field name="firstName" component={ErrorField} />
        <Field name="lastName" component={ErrorField} />
        <Field name="email" component={ErrorField} />
        <div>
          <input type="submit" style={{marginTop: '15px'}} />
        </div>
      </form>
    </div>
  )
}


const validate = ({firstName, lastName, email}) => {
  const errors = {}

  if (!firstName) errors.firstName = 'First name is required'

  if (!lastName) errors.lastName = 'Last name is required'

  if (!email) errors.email = 'Email is required'
    else if (!emailValidator.validate(email)) errors.email = 'Invalid email'
    else if (checkRepeatEmail(email)) errors.email = 'User with this email already exists'

  return errors
}

const checkRepeatEmail = (email) => {
  let result = false
  people.map((el) => { if (el.email === email) result = true })
  return result
}


export default reduxForm({
  form: 'people',
  validate
})(PeopleForm)