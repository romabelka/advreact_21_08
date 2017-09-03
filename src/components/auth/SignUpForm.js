import React, { Component } from 'react'
import {reduxForm, Field} from 'redux-form'

import ErrorField from '../common/ErrorField'
import validate from './validate'


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

export default reduxForm({
    form: 'auth',
    validate
})(SignUpForm)