import React, { Component } from 'react'
import {reduxForm, Field} from 'redux-form'
import emailValidator from 'email-validator'
import ErrorField from '../common/ErrorField'

class RegisteredUserForm extends Component {
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

const validate = ({firstName,lastName, email}) => {
    //debugger
    let  errors = {}
    const validateName = (param,label)=>{
        
        if (!param) errors[label] = `${label} is required`
            else if (/^[a-zA-Zа-яА-ЯёЁ]$/.test(param)) errors[label] = `invalid ${label}`
    }
    if (!email) errors.email = 'email is required'
        else if (!emailValidator.validate(email)) errors.email = 'invalid email'
    
    validateName(lastName,'lastName')
    validateName(firstName,'firstName')
    return errors
}


export default reduxForm({
    form: 'registeredUserForm',
    validate
})(RegisteredUserForm)