import emailValidator from 'email-validator'
export default function({email, password}){
    const errors = {}

    if (!email) errors.email = 'email is required'
    else if (!emailValidator.validate(email)) errors.email = 'invalid email'

    if (!password) errors.password = 'password is required'
    else if (password.length < 8) errors.password = 'to short'

    return errors
}