import React, { Component } from 'react'
import {reduxForm, Field} from 'redux-form'
import emailValidator from 'email-validator'
import ErrorField from '../common/ErrorField'

class RegisteredUserForm extends Component {
    static propTypes = {

    };

    render() {
        const {handleSubmit} = this.props
        return (
            <div>
                <h2>Add user form</h2>
                <form onSubmit={handleSubmit}>
                    <Field name="firstName" component={ErrorField}/>
                    <Field name="lastName" component={ErrorField} />
                    <Field name="email" component={ErrorField} />
                    
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

    if (!email) errors.email = 'email is required'
    else if (!emailValidator.validate(email)) errors.email = 'invalid email'

    if (!password) errors.password = 'password is required'
    else if (password.length < 8) errors.password = 'to short'

    return errors
}


export default reduxForm({
    form: 'registeredUserForm',
    validate
})(RegisteredUserForm)