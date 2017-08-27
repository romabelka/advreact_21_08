import emailValidator from 'email-validator'

export const getEmailFieldError = (email) => {
  if (!email) return 'email is required'
  else if (!emailValidator.validate(email)) return 'invalid email'
  return null;
};
