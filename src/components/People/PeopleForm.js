import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import ErrorField from '../common/ErrorField'
import emailValidator from 'email-validator'

class PeopleForm extends Component {
    render() {
        const { handleSubmit, submitting } = this.props;
        return (
            <div>
                <h2>
                    Add person
                </h2>
                <form onSubmit={handleSubmit(values=>console.log(values))}>
                    <Field name="first_name" component={ErrorField} />
                    <Field name="last_name" component={ErrorField} />   
                    <Field name="email"  component={ErrorField} />
                    <div>
                        <input type="submit" disabled={submitting} />
                    </div> 
                </form>  
            </div>
        );
    }
}

const validate = ({first_name, last_name, email}) => {
    const errors = {}

    if (!email) errors.email = 'email is required'
    else if (!emailValidator.validate(email)) errors.email = 'invalid email'

    if (!first_name) errors.first_name = 'first_name is required'
        
    if(!last_name) errors.last_name = 'last_name is required'

    return errors
}


export default reduxForm({
    form: 'people',
    validate
})(PeopleForm);