import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import ErrorField from '../common/ErrorField'
import emailValidator from 'email-validator'
import { moduleName, addUser} from '../../ducks/people'
import { connect } from 'react-redux'

class PeopleForm extends Component {
    render() {
        const { handleSubmit, submitting } = this.props;
        return (
            <div>
                <h2>
                    Add person
                </h2>
                <form onSubmit={handleSubmit(this.props.addUser)}>
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

const mapStateToProps = (state) => ({
   loading: state[moduleName.loading]
});

const mapDispatchToProps = (dispatch)  => ({

    addUser: ({first_name, last_name, email}) => dispatch(addUser({first_name, last_name, email}))
});

PeopleForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(PeopleForm);

export default reduxForm({
    form: 'people',
    validate,
})(PeopleForm);