import React, { Component } from 'react'
import {reduxForm, Field} from 'redux-form'
import emailValidator from 'email-validator'
import ErrorField from '../common/ErrorField'

class CreateForm extends Component {
    static propTypes = {

    };

    render() {
        const {handleSubmit} = this.props
        return (
            <div>
                <h2>Create</h2>
                <form onSubmit={handleSubmit}>
                    <Field name="email" component={ErrorField} />
                    <Field name="firstName" component={ErrorField} />
                    <Field name="lastName" component={ErrorField} />
                    <div>
                        <input type="submit" />
                    </div>
                </form>
            </div>
        )
    }
}

const validate = ({email, firstName,lastName}) => {
    const errors = {}

    if (!email) errors.email = 'email is required'
    else if (!emailValidator.validate(email)) errors.email = 'invalid email'

    if (!firstName) errors.firstName = 'firstName is required'
    if (!lastName) errors.lastName = 'lastName is required'

    return errors
}


export default reduxForm({
    form: 'people-create',
    validate
})(CreateForm)