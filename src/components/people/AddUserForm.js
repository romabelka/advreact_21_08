import React, { Component } from 'react'
import {NavLink} from 'react-router-dom'
import {reduxForm, Field} from 'redux-form'
import emailValidator from 'email-validator'
import ErrorField from '../common/ErrorField'

class AddUserForm extends Component {
    static propTypes = {

    };

    render() {
        const {handleSubmit} = this.props
        return (
            <div>
                <NavLink to="/people" activeStyle={{color: 'red'}}>back</NavLink>
                <h2>Add People</h2>
                <form onSubmit={handleSubmit}>
                    <Field name="firstname" component={ErrorField} type="text"/>
                    <Field name="lastname" component={ErrorField} type="text"/>
                    <Field name="email" component={ErrorField} />
                    <div>
                        <input type="submit" />
                    </div>
                </form>
            </div>
        )
    }
}

const validate = ({email}) => {
    const errors = {}

    if (!email) errors.email = 'email is required'
    else if (!emailValidator.validate(email)) errors.email = 'invalid email'

    /*тут бы еще хотелось проверять, есть ли уже такой e-mail, но я вот не знаю как лучше подрубить стор?
    как то так?
    export default connect(state => ({..}))(reduxForm({
        form: 'addPeople',
        validate
    })(AddUserForm))
    *
    * */


    return errors
}


export default reduxForm({
    form: 'addPeople',
    validate
})(AddUserForm)