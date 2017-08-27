import React, { Component } from 'react'
import {reduxForm, Field} from 'redux-form'
import ErrorField from '../common/ErrorField'
import { getEmailFieldError } from '../../helpers'

class SignUpForm extends Component {
    static propTypes = {

    };

    render() {
        const {handleSubmit} = this.props
        return (
            <div>
                <h2>Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <Field name="email" component={ErrorField} />
                    <Field name="password" component={ErrorField} type="password"/>
                    <div>
                        <input type="submit" />
                    </div>
                </form>
            </div>
        )
    }
}

const validate = ({email, password}) => {
    const errors = {}

    const emailError = getEmailFieldError(email)
    if (emailError) errors.email = emailError

    if (!password) errors.password = 'password is required'
    else if (password.length < 8) errors.password = 'to short'

    return errors
}


export default reduxForm({
    form: 'auth',
    validate
})(SignUpForm)